from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import backend.services.supabase_service as db_service

router = APIRouter()

class MapPin(BaseModel):
    id: int
    type: str
    name: str
    name_hi: str
    lat: float
    lng: float
    icon: str
    desc: str
    desc_hi: str

@router.get("/map", response_model=List[MapPin])
def get_map_pins_endpoint():
    return db_service.MOCK_MAP_PINS
