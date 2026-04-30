from __future__ import annotations
from typing import List
from fastapi import APIRouter, HTTPException
from app.models.schemas import Story
from app.data.mock_data import stories

router = APIRouter(prefix="/stories", tags=["stories"])


@router.get("/", response_model=List[Story])
def get_stories():
    return stories


@router.get("/{story_id}", response_model=Story)
def get_story(story_id: int):
    story = next((s for s in stories if s["id"] == story_id), None)
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return story
