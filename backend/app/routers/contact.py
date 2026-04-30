from fastapi import APIRouter
from app.models.schemas import ContactMessage, ContactResponse, NewsletterSignup, NewsletterResponse

router = APIRouter(tags=["contact"])

newsletter_subscribers: list[str] = []


@router.post("/contact", response_model=ContactResponse)
def send_contact(message: ContactMessage):
    # In production, send an email here
    print(f"Contact from {message.name} <{message.email}>: {message.subject}")
    return ContactResponse(success=True, message="Thank you! We'll be in touch within 24 hours.")


@router.post("/newsletter", response_model=NewsletterResponse)
def subscribe_newsletter(signup: NewsletterSignup):
    if signup.email in newsletter_subscribers:
        return NewsletterResponse(success=False, message="You're already subscribed!")
    newsletter_subscribers.append(signup.email)
    return NewsletterResponse(success=True, message="Welcome aboard! Adventure awaits in your inbox.")
