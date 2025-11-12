from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from uuid import uuid4
from passlib.context import CryptContext
from ..models.user import User
from ..models.candidate import Candidate
from ..schemas.candidate_schemas import CandidateCreate


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class CandidateService:
    def __init__(self, db: Session):
        self.db = db

    def get_candidate_by_email(self, email: str) -> Optional[Candidate]:
        """Get candidate by email through the user relationship"""
        user = self.db.query(User).filter(User.email == email).first()
        if user and user.candidate_profile:
            return user.candidate_profile
        return None

    def create_candidate(self, candidate_data: CandidateCreate) -> Optional[dict]:
        """Create a new candidate with user account and return dict with email from user"""
        try:
            # Hash the password
            hashed_password = pwd_context.hash(candidate_data.password)
            
            # Create the user first
            user = User(
                id=str(uuid4()),
                email=candidate_data.email,
                name=f"{candidate_data.first_name} {candidate_data.last_name}",
                hashed_password=hashed_password,
                role="candidate",  # Set role to candidate
                is_active=True
            )
            self.db.add(user)
            self.db.flush()  # This ensures the user gets an ID without committing
            
            # Create the candidate profile
            candidate = Candidate(
                id=str(uuid4()),
                user_id=user.id,
                first_name=candidate_data.first_name,
                last_name=candidate_data.last_name,
                phone_number=candidate_data.phone_number,
                date_of_birth=candidate_data.date_of_birth,
                location=candidate_data.location,
                current_role=candidate_data.current_role,
                current_company=candidate_data.current_company,
                years_of_experience=candidate_data.years_of_experience,
                skills=candidate_data.skills,
                education=candidate_data.education,
                resume_url=candidate_data.resume_url,
                is_verified=False  # Not verified by default
            )
            self.db.add(candidate)
            self.db.commit()
            self.db.refresh(candidate)
            
            # Return a dictionary with all required fields including email from user
            result = {
                "id": candidate.id,
                "first_name": candidate.first_name,
                "last_name": candidate.last_name,
                "email": user.email,  # Get email from the user object
                "phone_number": candidate.phone_number,
                "date_of_birth": candidate.date_of_birth,
                "location": candidate.location,
                "current_role": candidate.current_role,
                "current_company": candidate.current_company,
                "years_of_experience": candidate.years_of_experience,
                "skills": candidate.skills,
                "education": candidate.education,
                "resume_url": candidate.resume_url,
                "user_id": candidate.user_id,
                "is_verified": candidate.is_verified,
                "created_at": candidate.created_at,
                "updated_at": candidate.updated_at
            }
            
            return result
        except IntegrityError:
            self.db.rollback()
            return None
        except Exception as e:
            self.db.rollback()
            raise e

    def create_candidate_with_user(self, candidate_data: CandidateCreate) -> Optional[Candidate]:
        """Alias to create_candidate method"""
        return self.create_candidate(candidate_data)