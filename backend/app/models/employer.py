from sqlalchemy import Column, String, Boolean, DateTime, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base


class Employer(Base):
    __tablename__ = "employers"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)  # Link to the user table
    company_name = Column(String, nullable=False)
    contact_person_first_name = Column(String, nullable=False)
    contact_person_last_name = Column(String, nullable=False)
    phone_number = Column(String)
    website = Column(String)
    industry = Column(String)
    company_size = Column(String)  # e.g., "1-10", "11-50", "51-200", "201-500", "500+"
    location = Column(String)  # City, State, or Country
    description = Column(Text)
    is_verified = Column(Boolean, default=False)  # Verification status
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship to the user
    user = relationship("User", back_populates="employer_profile")
    # Relationship to the MFA record
    mfa = relationship("EmployerMFA", back_populates="employer", uselist=False, cascade="all, delete-orphan")


class EmployerMFA(Base):
    __tablename__ = "employer_mfa"

    id = Column(String, primary_key=True, index=True)
    employer_id = Column(String, ForeignKey("employers.id"), unique=True, nullable=False)
    secret_key = Column(String, nullable=False)  # TOTP secret
    is_enabled = Column(Boolean, default=False)
    backup_codes = Column(Text)  # JSON string of backup codes
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship to the employer
    employer = relationship("Employer", back_populates="mfa")