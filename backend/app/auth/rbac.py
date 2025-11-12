from fastapi import HTTPException, status
from .schemas import TokenData
from typing import List, Union


class RoleChecker:
    def __init__(self, allowed_roles: Union[str, List[str]]):
        if isinstance(allowed_roles, str):
            self.allowed_roles = [allowed_roles]
        else:
            self.allowed_roles = allowed_roles

    def __call__(self, token_data: TokenData = None):
        if not token_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required"
            )
        
        # Check if any of the user's roles match the allowed roles
        user_roles = token_data.roles
        has_role = any(role in self.allowed_roles for role in user_roles)
        
        if not has_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted"
            )
        
        return token_data


# Role checker instances for different user types
require_candidate = RoleChecker("candidate")
require_employer = RoleChecker(["employer_admin", "employer_recruiter"])
require_employer_admin = RoleChecker("employer_admin")
require_super_admin = RoleChecker("super_admin")
require_authenticated = RoleChecker(["candidate", "employer_admin", "employer_recruiter", "super_admin"])