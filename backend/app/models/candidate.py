from sqlalchemy import Column, String, Boolean, DateTime, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)  # Link to the user table
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone_number = Column(String)
    date_of_birth = Column(DateTime(timezone=True))
    location = Column(String)  # City, State, or Country
    current_role = Column(String)  # Job title
    current_company = Column(String)
    years_of_experience = Column(Integer, default=0)
    skills = Column(Text)  # JSON string or comma-separated skills
    education = Column(Text)  # JSON string or text for education history
    resume_url = Column(String)  # URL to resume file
    is_verified = Column(Boolean, default=False)  # Verification status
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship to the user
    user = relationship("User", back_populates="candidate_profile")
    # Relationship to the MFA record
    mfa = relationship("CandidateMFA", back_populates="candidate", uselist=False, cascade="all, delete-orphan")


class CandidateMFA(Base):
    __tablename__ = "candidate_mfa"

    id = Column(String, primary_key=True, index=True)
    candidate_id = Column(String, ForeignKey("candidates.id"), unique=True, nullable=False)
    secret_key = Column(String, nullable=False)  # TOTP secret
    is_enabled = Column(Boolean, default=False)
    backup_codes = Column(Text)  # JSON string of backup codes
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship to the candidate
    candidate = relationship("Candidate", back_populates="mfa")