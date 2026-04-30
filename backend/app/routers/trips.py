from __future__ import annotations
from typing import Optional, List
from fastapi import APIRouter
from app.data.mock_data import trips, destinations

router = APIRouter(prefix="/trips", tags=["trips"])


@router.get("/", response_model=List[dict])
def get_trips(month: Optional[int] = None):
    result = []
    for trip in trips:
        dest = next((d for d in destinations if d["id"] == trip["destination_id"]), None)
        enriched = {**trip, "destination_name": dest["name"] if dest else "", "destination_country": dest["country"] if dest else "", "image_url": dest["image_url"] if dest else ""}
        if month:
            trip_month = int(trip["start_date"].split("-")[1])
            if trip_month != month:
                continue
        result.append(enriched)
    return result
