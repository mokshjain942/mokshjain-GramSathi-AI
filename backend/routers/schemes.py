from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import backend.services.supabase_service as db_service
from backend.services.groq_service import get_scheme_recommendations

router = APIRouter()

class RecommendRequest(BaseModel):
    occupation: str
    village: str
    state: str
    language: str = "en"

class RecommendResponse(BaseModel):
    recommendation: str

class Scheme(BaseModel):
    id: int
    category: str
    title: str
    title_hi: str
    description: str
    description_hi: str
    eligibility: str
    eligibility_hi: str
    documents: List[str]
    documents_hi: List[str]
    process: str
    process_hi: str

@router.get("/schemes", response_model=List[Scheme])
def get_schemes():
    # If using live Supabase, read schemes. Otherwise, return fallbacks.
    return db_service.MOCK_SCHEMES

@router.post("/schemes/recommend", response_model=RecommendResponse)
def recommend_schemes_endpoint(request: RecommendRequest):
    recommendation = get_scheme_recommendations(
        request.occupation,
        request.village,
        request.state,
        request.language
    )
    return RecommendResponse(recommendation=recommendation)
