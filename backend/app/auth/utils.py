import os
from jose import jwt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from ..config import settings


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt


def create_refresh_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt


def verify_token(token: str, credentials_exception, token_type: str = "access"):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        token_type_claim = payload.get("type")
        
        # Check if token type matches
        if token_type_claim != token_type:
            raise credentials_exception
            
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return user_id, payload
    except jwt.JWTError:
        raise credentials_exception


def decode_token_payload(token: str) -> Optional[Dict[str, Any]]:
    """Decode token payload without verification - for debugging only"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"], options={"verify_signature": False})
        return payload
    except jwt.JWTError:
        return None