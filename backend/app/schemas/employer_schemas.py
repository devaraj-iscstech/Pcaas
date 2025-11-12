from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


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


class Employer(BaseModel):
    id: str
    company_name: str
    contact_person_first_name: str
    contact_person_last_name: str
    email: str  # This should come from the user relationship
    phone_number: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    user_id: str
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True