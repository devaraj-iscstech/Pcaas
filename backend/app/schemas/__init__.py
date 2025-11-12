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


class Candidate(CandidateBase):
    id: str
    user_id: str
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class EmployerBase(BaseModel):
    company_name: str
    contact_person_first_name: str
    contact_person_last_name: str
    email: str
    phone_number: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None  # e.g., "1-10", "11-50", "51-200", "201-500", "500+"
    location: Optional[str] = None  # City, State, or Country
    description: Optional[str] = None


class EmployerCreate(EmployerBase):
    password: str


class EmployerUpdate(BaseModel):
    company_name: Optional[str] = None
    contact_person_first_name: Optional[str] = None
    contact_person_last_name: Optional[str] = None
    phone_number: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None


class Employer(EmployerBase):
    id: str
    user_id: str
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class MFASetupResponse(BaseModel):
    qr_code_url: str
    secret_key: str
    backup_codes: List[str]


class MFAVerifyRequest(BaseModel):
    token: str
    secret_key: str


class MFAEnableRequest(BaseModel):
    token: str