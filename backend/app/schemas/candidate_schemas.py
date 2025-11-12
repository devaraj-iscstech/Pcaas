from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class CandidateBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    location: Optional[str] = None
    current_role: Optional[str] = None
    current_company: Optional[str] = None
    years_of_experience: Optional[int] = 0
    skills: Optional[str] = None  # JSON string or comma-separated skills
    education: Optional[str] = None  # JSON string or text for education history
    resume_url: Optional[str] = None  # URL to resume file


class CandidateCreate(CandidateBase):
    password: str


class CandidateUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    location: Optional[str] = None
    current_role: Optional[str] = None
    current_company: Optional[str] = None
    years_of_experience: Optional[int] = None
    skills: Optional[str] = None
    education: Optional[str] = None
    resume_url: Optional[str] = None


class Candidate(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str  # This should come from the user relationship
    phone_number: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    location: Optional[str] = None
    current_role: Optional[str] = None
    current_company: Optional[str] = None
    years_of_experience: Optional[int] = 0
    skills: Optional[str] = None
    education: Optional[str] = None
    resume_url: Optional[str] = None
    user_id: str
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True