from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status

from app import storage
from app.models.schemas import ContactMessage, ContactResponse, NewsletterSignup, NewsletterResponse
from app.notifications import notify_contact

router = APIRouter(tags=["contact"])

newsletter_subscribers: list[str] = []

UNDELIVERED_DETAIL = (
    "We could not send your message just now. Please try again in a moment, "
    "or reach us on WhatsApp and we will pick it up straight away."
)


@router.post("/contact", response_model=ContactResponse)
def send_contact(message: ContactMessage):
    # Sent inline rather than as a background task: a background send that fails
    # leaves the visitor looking at a thank-you page for a message that was
    # never delivered anywhere.
    data = message.dict()
    data["submitted_at"] = datetime.now(timezone.utc).isoformat()
    data["form_type"] = "contact"

    persisted = storage.append(data)
    delivered = notify_contact(data)

    if not delivered and not (persisted and storage.IS_DURABLE):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=UNDELIVERED_DETAIL,
        )

    return ContactResponse(success=True, message="Thank you! We'll be in touch within 24 hours.")


@router.post("/newsletter", response_model=NewsletterResponse)
def subscribe_newsletter(signup: NewsletterSignup):
    if signup.email in newsletter_subscribers:
        return NewsletterResponse(success=False, message="You're already subscribed!")
    newsletter_subscribers.append(signup.email)
    storage.append({
        "form_type": "newsletter",
        "email": signup.email,
        "submitted_at": datetime.now(timezone.utc).isoformat(),
    })
    return NewsletterResponse(success=True, message="Welcome aboard! Adventure awaits in your inbox.")
