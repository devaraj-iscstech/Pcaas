from .user import User, Role, Permission
from .candidate import Candidate, CandidateMFA
from .employer import Employer, EmployerMFA

# Import all models to ensure they are registered with SQLAlchemy
__all__ = [
    "User", "Role", "Permission",
    "Candidate", "CandidateMFA",
    "Employer", "EmployerMFA"
]