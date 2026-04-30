import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import destinations, trips, testimonials, stories, contact


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


@app.get("/")
def root():
    return {"message": "Europe on Wheels API is running", "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok"}
