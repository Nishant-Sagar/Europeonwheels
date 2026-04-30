from __future__ import annotations
from typing import Optional, List
from fastapi import APIRouter, HTTPException
from app.models.schemas import Destination
from app.data.mock_data import destinations

router = APIRouter(prefix="/destinations", tags=["destinations"])


@router.get("/", response_model=List[Destination])
def get_destinations(tag: Optional[str] = None, difficulty: Optional[str] = None):
    result = destinations
    if tag:
        result = [d for d in result if tag.lower() in [t.lower() for t in d["tags"]]]
    if difficulty:
        result = [d for d in result if d["difficulty"].lower() == difficulty.lower()]
    return result


@router.get("/{slug}", response_model=Destination)
def get_destination(slug: str):
    dest = next((d for d in destinations if d["slug"] == slug), None)
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return dest
