from __future__ import annotations
from pydantic import BaseModel, EmailStr
from typing import Optional, List


class Destination(BaseModel):
    id: int
    slug: str
    name: str
    country: str
    description: str
    duration_days: int
    price_eur: float
    max_group_size: int
    difficulty: str
    transport: str
    image_url: str
    highlights: List[str]
    tags: List[str]
    rating: float
    reviews_count: int


class Trip(BaseModel):
    id: int
    destination_id: int
    start_date: str
    end_date: str
    spots_total: int
    spots_left: int
    price_eur: float


class Testimonial(BaseModel):
    id: int
    name: str
    country: str
    destination: str
    rating: int
    text: str
    avatar_url: str


class Story(BaseModel):
    id: int
    title: str
    author: str
    destination: str
    date: str
    read_time_min: int
    excerpt: str
    image_url: str


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class NewsletterSignup(BaseModel):
    email: EmailStr


class ContactResponse(BaseModel):
    success: bool
    message: str


class NewsletterResponse(BaseModel):
    success: bool
    message: str
