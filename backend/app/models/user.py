from sqlalchemy import Column, String, Boolean, DateTime, Integer, Table, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from uuid import uuid4
from ..database import Base


# Association table for User-Role relationship
user_roles = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id")),
    Column("role_id", String, ForeignKey("roles.id"))
)

# Association table for Role-Permission relationship
role_permissions = Table(
    "role_permissions",
    Base.metadata,
    Column("role_id", String, ForeignKey("roles.id")),
    Column("permission_id", String, ForeignKey("permissions.id"))
)


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String)
    role = Column(String, nullable=False)  # candidate, employer, super_admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship to roles
    roles = relationship("Role", secondary=user_roles, back_populates="users")
    
    # Relationship to candidate or employer profile (one-to-one, exclusive)
    candidate_profile = relationship("Candidate", back_populates="user", uselist=False, cascade="all, delete-orphan")
    employer_profile = relationship("Employer", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Role(Base):
    __tablename__ = "roles"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)  # candidate, employer_admin, employer_recruiter, super_admin
    description = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    users = relationship("User", secondary=user_roles, back_populates="roles")
    permissions = relationship("Permission", secondary=role_permissions, back_populates="roles")


class Permission(Base):
    __tablename__ = "permissions"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)  # e.g., "candidate:read", "candidate:write", "employer:*"
    description = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship to roles
    roles = relationship("Role", secondary=role_permissions, back_populates="permissions")