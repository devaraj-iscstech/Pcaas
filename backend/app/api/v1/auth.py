from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
from datetime import timedelta
from pydantic import BaseModel
from ...auth.dependencies import get_current_user, verify_jwt_token
from ...auth.schemas import Token, TokenData, User
from ...auth.rbac import require_authenticated, require_super_admin
from ...config import settings
from ...services.auth_service import AuthService, get_auth_service, get_candidate_service, get_employer_service, get_mfa_service
from ...models.user import User as UserModel  # Renaming to avoid conflict
from ...schemas.candidate_schemas import CandidateCreate, Candidate as CandidateSchema
from ...schemas.employer_schemas import EmployerCreate, Employer as EmployerSchema
from ...auth.utils import create_access_token, create_refresh_token, verify_token
from jose import JWTError
from datetime import datetime
from typing import Optional

router = APIRouter()


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), auth_service: AuthService = Depends(get_auth_service)) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = auth_service.authenticate_user(form_data.username, form_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    access_token = create_access_token(
        data={"sub": user.id, "roles": [user.role]}, expires_delta=access_token_expires
    )
    
    refresh_token = create_refresh_token(
        data={"sub": user.id, "roles": [user.role]}, expires_delta=refresh_token_expires
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }


@router.post("/refresh", response_model=Token)
async def refresh_token(refresh_token: str, auth_service: AuthService = Depends(get_auth_service)) -> Any:
    """
    Refresh access token using refresh token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        user_id, payload = verify_token(refresh_token, credentials_exception, token_type="refresh")
        
        # Fetch user to ensure they still exist and are active
        user = auth_service.get_user_by_id(user_id)
        if not user or not user.is_active:
            raise credentials_exception
            
        # Create new access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        new_access_token = create_access_token(
            data={"sub": user.id, "roles": [user.role]}, expires_delta=access_token_expires
        )
        
        # Optionally create a new refresh token as well (rolling refresh tokens)
        refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        new_refresh_token = create_refresh_token(
            data={"sub": user.id, "roles": [user.role]}, expires_delta=refresh_token_expires
        )
        
        return {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        }
        
    except JWTError:
        raise credentials_exception


@router.get("/me", response_model=User)
async def get_current_user_profile(
    current_user: TokenData = Depends(get_current_user)
) -> Any:
    """
    Get current user profile
    """
    # The current user is already validated in the dependency
    from sqlalchemy.orm import Session
    from ...database import get_db
    from ...services.auth_service import AuthService
    
    db: Session = next(get_db())
    try:
        auth_service = AuthService(db)
        user_db = auth_service.get_user_by_id(current_user.user_id)
        if not user_db:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
            
        return User(
            id=user_db.id,
            email=user_db.email,
            name=user_db.name,
            role=user_db.role,
            is_active=user_db.is_active,
            created_at=str(user_db.created_at)
        )
    finally:
        db.close()


@router.post("/logout")
async def logout() -> Any:
    """
    Logout endpoint
    """
    return {"message": "Successfully logged out"}


@router.get("/callback")
async def auth_callback(code: str, state: str = None) -> Any:
    """
    OAuth2 callback endpoint - handles the OAuth2 callback
    """
    # This will be updated when we implement full OAuth2 provider support
    raise HTTPException(status_code=404, detail="Callback endpoint not implemented")


@router.get("/roles")
async def get_user_roles(
    current_user: TokenData = Depends(require_authenticated)
) -> Any:
    """
    Get roles for the current authenticated user
    """
    return {
        "user_id": current_user.user_id,
        "roles": current_user.roles
    }


@router.post("/register/candidate", response_model=CandidateSchema)
async def register_candidate(
    candidate_data: CandidateCreate,
    candidate_service = Depends(get_candidate_service),
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
    
    # Make sure the relationship is properly loaded
    # If it's still failing, we might need to create a custom response
    return candidate


@router.post("/register/employer", response_model=EmployerSchema)
async def register_employer(
    employer_data: EmployerCreate,
    employer_service = Depends(get_employer_service),
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