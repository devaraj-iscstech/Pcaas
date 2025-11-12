from pydantic import BaseModel
from typing import List, Optional


class Token(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str
    expires_in: int


class TokenData(BaseModel):
    user_id: str
    roles: List[str]


class UserBase(BaseModel):
    email: str
    name: str
    role: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: str
    is_active: bool = True
    created_at: str

    class Config:
        from_attributes = True


class RoleBase(BaseModel):
    name: str
    description: Optional[str] = None


class Role(RoleBase):
    id: str

    class Config:
        from_attributes = True


class PermissionBase(BaseModel):
    name: str
    description: Optional[str] = None


class Permission(PermissionBase):
    id: str

    class Config:
        from_attributes = True