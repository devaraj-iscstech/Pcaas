from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from typing import Optional
from .rbac import RoleChecker
from .schemas import TokenData
from ..config import settings
from ..database import get_db
from sqlalchemy.orm import Session

security = HTTPBearer()

def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # Decode the JWT token using our own secret key
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"],
        )
        
        # Extract user information from the token
        user_id: str = payload.get("sub")
        user_roles: list = payload.get("roles", [])
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        token_data = TokenData(user_id=user_id, roles=user_roles)
        return token_data
        
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_current_user(token_data: TokenData = Depends(verify_jwt_token), db: Session = Depends(get_db)):
    # Fetch user details from database based on token data
    from ..services.auth_service import AuthService
    auth_service = AuthService(db)
    user = auth_service.get_user_by_id(token_data.user_id)
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update token data with user information from database
    return TokenData(user_id=user.id, roles=[user.role])