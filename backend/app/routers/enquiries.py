from fastapi import APIRouter
from app.models.schemas import TripEnquiry, TripEnquiryResponse
import uuid
from datetime import datetime

router = APIRouter(prefix="/enquiries", tags=["enquiries"])

# In-memory store (replace with DB in production)
_store: list[dict] = []


@router.post("/", response_model=TripEnquiryResponse)
def submit_enquiry(enquiry: TripEnquiry):
    entry = enquiry.dict()
    entry["id"] = str(uuid.uuid4())
    entry["submitted_at"] = datetime.utcnow().isoformat()
    _store.append(entry)
    return TripEnquiryResponse(
        success=True,
        message=f"Thanks {enquiry.name}! We'll get back to you within 24 hours.",
        enquiry_id=entry["id"],
    )


@router.get("/")
def list_enquiries():
    return _store
