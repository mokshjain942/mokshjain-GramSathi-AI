from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import backend.services.supabase_service as db_service

router = APIRouter()

class Notice(BaseModel):
    title: str
    title_hi: str
    type: str
    date: str
    description: str
    description_hi: str

@router.get("/announcements", response_model=List[Notice])
def get_announcements_endpoint():
    return db_service.MOCK_ANNOUNCEMENTS
