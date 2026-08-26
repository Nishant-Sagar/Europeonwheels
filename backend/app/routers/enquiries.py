import os
import secrets
import uuid
from collections import OrderedDict
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Header, HTTPException, status

from app import storage
from app.models.schemas import TripEnquiry, TripEnquiryResponse
from app.notifications import notify_enquiry

router = APIRouter(prefix="/enquiries", tags=["enquiries"])

# Set ADMIN_TOKEN in the environment to enable the listing endpoint. Without it
# the endpoint stays closed — it returns every customer's name, email and phone,
# so it must never be open by default.
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN")

_store: list[dict] = []

# Client-supplied X-Idempotency-Key -> the entry it created. The frontend keeps
# one key across its cold-start retries, so a request that landed but whose
# response never made it back is not turned into a duplicate lead.
_by_key: "OrderedDict[str, dict]" = OrderedDict()
_MAX_KEYS = 500

UNDELIVERED_DETAIL = (
    "We could not record your enquiry just now. Please try again in a moment, "
    "or send us the details on WhatsApp and we will pick it up straight away."
)


def _public(entry: dict) -> dict:
    """Strip internal bookkeeping before an entry leaves the process."""
    return {k: v for k, v in entry.items() if not k.startswith("_")}


def _remember(key: str, entry: dict) -> None:
    _by_key[key] = entry
    _by_key.move_to_end(key)
    while len(_by_key) > _MAX_KEYS:
        _by_key.popitem(last=False)


@router.post("/", response_model=TripEnquiryResponse)
def submit_enquiry(
    enquiry: TripEnquiry,
    idempotency_key: Optional[str] = Header(default=None, alias="X-Idempotency-Key"),
):
    entry = _by_key.get(idempotency_key) if idempotency_key else None

    if entry is None:
        entry = enquiry.dict()
        entry["id"] = str(uuid.uuid4())
        entry["submitted_at"] = datetime.now(timezone.utc).isoformat()
        entry["_delivered"] = False
        _store.append(entry)
        entry["_persisted"] = storage.append(_public(entry))
        if idempotency_key:
            _remember(idempotency_key, entry)

    # A retry of an enquiry we already got through on costs nothing and sends
    # nothing — the customer just gets the same answer as the first time.
    if not entry["_delivered"]:
        entry["_delivered"] = notify_enquiry(_public(entry))

    # The lead is safe if a notification went out, or if it landed in a lead
    # store that actually survives a restart. If neither is true, say so rather
    # than showing a thank-you page for an enquiry nobody will ever see.
    safe = entry["_delivered"] or (entry["_persisted"] and storage.IS_DURABLE)
    if not safe:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=UNDELIVERED_DETAIL,
        )

    return TripEnquiryResponse(
        success=True,
        message=f"Thanks {enquiry.name}! We'll get back to you within 24 hours.",
        enquiry_id=entry["id"],
    )


@router.get("/")
def list_enquiries(authorization: Optional[str] = Header(default=None)):
    if not ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found.",
        )

    expected = f"Bearer {ADMIN_TOKEN}"
    if not authorization or not secrets.compare_digest(authorization, expected):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Prefer the file, which spans restarts; fall back to this process's memory.
    return storage.read_all() or [_public(e) for e in _store]
