from __future__ import annotations
from typing import List
from fastapi import APIRouter
from app.models.schemas import Testimonial
from app.data.mock_data import testimonials

router = APIRouter(prefix="/testimonials", tags=["testimonials"])


@router.get("/", response_model=List[Testimonial])
def get_testimonials():
    return testimonials
