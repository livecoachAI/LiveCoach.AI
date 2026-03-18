from pydantic import BaseModel
from typing import Dict, List, Optional

class AnalysisResponse(BaseModel):
    success: bool
    sport: str
    shot: str
    shot_display_name: str
    overall_score: float
    performance_level: str
    distance_to_expert: float
    avg_similarity: float
    max_similarity: float
    frames_analyzed: int
    # Gemini-powered fields
    feedback: Optional[str] = None
    improvements: Optional[str] = None
    ai_feedback_enabled: bool = False


class SportsListResponse(BaseModel):
    sports: Dict
