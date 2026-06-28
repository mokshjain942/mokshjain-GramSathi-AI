from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import backend.services.supabase_service as db_service

router = APIRouter()

class Business(BaseModel):
    shop_name: str
    shop_name_hi: str
    category: str
    owner: str
    location: str
    rating: float
    services: str
    services_hi: str
    phone: str

@router.get("/businesses", response_model=List[Business])
def get_businesses_endpoint():
    return db_service.MOCK_BUSINESSES
