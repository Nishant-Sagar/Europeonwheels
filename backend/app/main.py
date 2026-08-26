import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import notifications, storage
from app.routers import destinations, trips, testimonials, stories, contact, enquiries


def get_allowed_origins():
    origins = os.getenv("FRONTEND_ORIGINS")
    if not origins:
        return ["http://localhost:5173", "http://localhost:3000"]
    return [origin.strip() for origin in origins.split(",") if origin.strip()]

app = FastAPI(
    title="Europe on Wheels API",
    description="Backend API for Europe on Wheels – curated road trip adventures across Europe",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(destinations.router, prefix="/api")
app.include_router(trips.router, prefix="/api")
app.include_router(testimonials.router, prefix="/api")
app.include_router(stories.router, prefix="/api")
app.include_router(contact.router, prefix="/api")
app.include_router(enquiries.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Europe on Wheels API is running", "docs": "/docs"}


@app.on_event("startup")
def warn_about_missing_config():
    """Fail loudly in the logs rather than silently dropping leads."""
    if not notifications.EMAIL_CONFIGURED:
        print("[startup] WARNING: RESEND_API_KEY / NOTIFY_EMAIL not set — "
              "enquiry emails will not be sent.", flush=True)
    if not notifications.WHATSAPP_CONFIGURED:
        print("[startup] WARNING: Green API env vars not set — "
              "WhatsApp notifications will not be sent.", flush=True)
    if not storage.IS_DURABLE:
        print("[startup] WARNING: LEAD_STORE_PATH not set — the lead log lives on "
              "an ephemeral disk and will not survive a restart.", flush=True)
    if not enquiries.ADMIN_TOKEN:
        print("[startup] NOTE: ADMIN_TOKEN not set — GET /api/enquiries/ is disabled.",
              flush=True)


@app.get("/health")
def health():
    """Cheap enough to be pinged every few minutes to keep the instance awake.

    Reports whether each delivery channel is configured — booleans only, never
    the credentials themselves.
    """
    return {
        "status": "ok",
        "email_configured": notifications.EMAIL_CONFIGURED,
        "whatsapp_configured": notifications.WHATSAPP_CONFIGURED,
        "durable_lead_store": storage.IS_DURABLE,
        "admin_listing_enabled": bool(enquiries.ADMIN_TOKEN),
    }
