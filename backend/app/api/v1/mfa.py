from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any
from ...services.auth_service import get_mfa_service
from ...auth.rbac import require_authenticated
from ...schemas.mfa_schemas import MFASetupResponse, MFAEnableRequest
from ...models.candidate import Candidate as CandidateModel
from ...models.employer import Employer as EmployerModel
from ...models.user import User as UserModel

router = APIRouter()


@router.post("/mfa/setup/candidate/{candidate_id}", response_model=MFASetupResponse)
async def setup_candidate_mfa(
    candidate_id: str,
    current_user: Any = Depends(require_authenticated),  # Super admin or user themselves
    mfa_service = Depends(get_mfa_service)
) -> Any:
    """
    Setup MFA for a candidate - super admin or the candidate themselves can do this
    """
    # Get the candidate
    candidate = mfa_service.db.query(CandidateModel).filter(
        CandidateModel.id == candidate_id
    ).first()
    
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found"
        )
    
    # Get user email to create proper QR code
    user = mfa_service.db.query(UserModel).filter(
        UserModel.id == candidate.user_id
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found for candidate"
        )
    
    result = mfa_service.setup_candidate_mfa(candidate_id, user.email)
    return result


@router.post("/mfa/setup/employer/{employer_id}", response_model=MFASetupResponse)
async def setup_employer_mfa(
    employer_id: str,
    current_user: Any = Depends(require_authenticated),  # Super admin or user themselves
    mfa_service = Depends(get_mfa_service)
) -> Any:
    """
    Setup MFA for an employer - super admin or the employer contact can do this
    """
    # Get the employer
    employer = mfa_service.db.query(EmployerModel).filter(
        EmployerModel.id == employer_id
    ).first()
    
    if not employer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employer not found"
        )
    
    # Get user email to create proper QR code
    user = mfa_service.db.query(UserModel).filter(
        UserModel.id == employer.user_id
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found for employer"
        )
    
    result = mfa_service.setup_employer_mfa(employer_id, user.email)
    return result


@router.post("/mfa/enable/candidate/{candidate_id}")
async def enable_candidate_mfa(
    candidate_id: str,
    mfa_request: MFAEnableRequest,
    mfa_service = Depends(get_mfa_service)
) -> Any:
    """
    Enable MFA for a candidate after verifying the token
    """
    success = mfa_service.enable_candidate_mfa(candidate_id, mfa_request.token, mfa_request.setup_secret_key)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid token. MFA could not be enabled."
        )
    
    return {"message": "MFA enabled successfully"}


@router.post("/mfa/enable/employer/{employer_id}")
async def enable_employer_mfa(
    employer_id: str,
    mfa_request: MFAEnableRequest,
    mfa_service = Depends(get_mfa_service)
) -> Any:
    """
    Enable MFA for an employer after verifying the token
    """
    success = mfa_service.enable_employer_mfa(employer_id, mfa_request.token, mfa_request.setup_secret_key)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid token. MFA could not be enabled."
        )
    
    return {"message": "MFA enabled successfully"}