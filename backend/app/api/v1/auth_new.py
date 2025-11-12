from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
from datetime import timedelta
from ..auth.dependencies import get_current_user, verify_jwt_token
from ..auth.schemas import Token, TokenData, User
from ..auth.rbac import require_authenticated, require_super_admin
from ..config import settings
from ..services.auth_service import AuthService, get_auth_service
from ..services.candidate_service import CandidateService, get_candidate_service
from ..services.employer_service import EmployerService, get_employer_service
from ..services.mfa_service import MFAService, get_mfa_service
from ..models.user import User as UserModel
from ..schemas.candidate_schemas import CandidateCreate, Candidate as CandidateSchema
from ..schemas.employer_schemas import EmployerCreate, Employer as EmployerSchema
from ..schemas.mfa_schemas import MFASetupResponse, MFAVerifyRequest, MFAEnableRequest
from ..auth.utils import create_access_token

router = APIRouter()


@router.post("/register/candidate", response_model=CandidateSchema)
async def register_candidate(
    candidate_data: CandidateCreate,
    candidate_service: CandidateService = Depends(get_candidate_service),
    auth_service: AuthService = Depends(get_auth_service)
) -> Any:
    """
    Register a new candidate account
    """
    # Check if email already exists
    existing_user = auth_service.get_user_by_email(candidate_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )
    
    # Create the candidate account
    candidate = candidate_service.create_candidate_with_user(candidate_data)
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create candidate account"
        )
    
    return candidate


@router.post("/register/employer", response_model=EmployerSchema)
async def register_employer(
    employer_data: EmployerCreate,
    employer_service: EmployerService = Depends(get_employer_service),
    auth_service: AuthService = Depends(get_auth_service)
) -> Any:
    """
    Register a new employer account
    """
    # Check if email already exists
    existing_user = auth_service.get_user_by_email(employer_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )
    
    # Create the employer account
    employer = employer_service.create_employer_with_user(employer_data)
    if not employer:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create employer account"
        )
    
    return employer


# Additional authentication endpoints specific to auth_new
@router.get("/user-profile")
async def get_user_profile(
    current_user: TokenData = Depends(require_authenticated),
    auth_service: AuthService = Depends(get_auth_service)
) -> Any:
    """
    Get current user's extended profile information
    """
    user_db = auth_service.get_user_by_id(current_user.user_id)
    if not user_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
        
    return {
        "id": user_db.id,
        "email": user_db.email,
        "name": user_db.name,
        "role": user_db.role,
        "is_active": user_db.is_active,
        "created_at": str(user_db.created_at),
        "profile_type": "candidate" if user_db.candidate_profile else ("employer" if user_db.employer_profile else "user")
    }


@router.put("/update-profile")
async def update_user_profile(
    name: str = None,
    current_user: TokenData = Depends(require_authenticated),
    auth_service: AuthService = Depends(get_auth_service)
) -> Any:
    """
    Update user profile information
    """
    user_db = auth_service.get_user_by_id(current_user.user_id)
    if not user_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if name:
        user_db.name = name
        auth_service.db.commit()
        
    return {"message": "Profile updated successfully"}