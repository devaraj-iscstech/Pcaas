from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from uuid import uuid4
from passlib.context import CryptContext
from ..models.user import User
from ..models.employer import Employer
from ..schemas.employer_schemas import EmployerCreate


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class EmployerService:
    def __init__(self, db: Session):
        self.db = db

    def get_employer_by_email(self, email: str) -> Optional[Employer]:
        """Get employer by email through the user relationship"""
        user = self.db.query(User).filter(User.email == email).first()
        if user and user.employer_profile:
            return user.employer_profile
        return None

    def create_employer(self, employer_data: EmployerCreate) -> Optional[dict]:
        """Create a new employer with user account and return dict with email from user"""
        try:
            # Hash the password
            hashed_password = pwd_context.hash(employer_data.password)
            
            # Create the user first
            user = User(
                id=str(uuid4()),
                email=employer_data.email,
                name=employer_data.company_name,  # Use company name as user name
                hashed_password=hashed_password,
                role="employer_admin",  # Set role to employer_admin by default
                is_active=True
            )
            self.db.add(user)
            self.db.flush()  # This ensures the user gets an ID without committing
            
            # Create the employer profile
            employer = Employer(
                id=str(uuid4()),
                user_id=user.id,
                company_name=employer_data.company_name,
                contact_person_first_name=employer_data.contact_person_first_name,
                contact_person_last_name=employer_data.contact_person_last_name,
                phone_number=employer_data.phone_number,
                website=employer_data.website,
                industry=employer_data.industry,
                company_size=employer_data.company_size,
                location=employer_data.location,
                description=employer_data.description,
                is_verified=False  # Not verified by default
            )
            self.db.add(employer)
            self.db.commit()
            self.db.refresh(employer)
            
            # Return a dictionary with all required fields including email from user
            result = {
                "id": employer.id,
                "company_name": employer.company_name,
                "contact_person_first_name": employer.contact_person_first_name,
                "contact_person_last_name": employer.contact_person_last_name,
                "email": user.email,  # Get email from the user object
                "phone_number": employer.phone_number,
                "website": employer.website,
                "industry": employer.industry,
                "company_size": employer.company_size,
                "location": employer.location,
                "description": employer.description,
                "user_id": employer.user_id,
                "is_verified": employer.is_verified,
                "created_at": employer.created_at,
                "updated_at": employer.updated_at
            }
            
            return result
        except IntegrityError:
            self.db.rollback()
            return None
        except Exception as e:
            self.db.rollback()
            raise e

    def create_employer_with_user(self, employer_data: EmployerCreate) -> Optional[Employer]:
        """Alias to create_employer method"""
        return self.create_employer(employer_data)