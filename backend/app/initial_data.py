import os
import time
from sqlalchemy import text
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from .database import get_sessionmaker
from .models.user import User, Role
from .config import settings
from typing import List
import logging
from uuid import uuid4
from passlib.context import CryptContext

logger = logging.getLogger(__name__)

# Create password context for hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    """Generate password hash, ensuring password doesn't exceed bcrypt's 72-byte limit"""
    # Bcrypt has a 72-byte password length limit
    # Truncate if necessary to avoid ValueError
    if len(password.encode('utf-8')) > 72:
        # For longer passwords, we'll truncate to 72 bytes while preserving the original string meaning
        # Convert to bytes, truncate to 72, then decode back to string
        truncated_password = password.encode('utf-8')[:72].decode('utf-8', errors='ignore')
        return pwd_context.hash(truncated_password)
    return pwd_context.hash(password)


def init_db(max_retries: int = 5) -> None:
    """
    Initialize the database with initial data including super admin user
    With retry mechanism to handle database connection issues during container startup
    """
    for attempt in range(max_retries):
        try:
            # Attempt to connect to the database using the lazy-loaded SessionLocal
            sessionmaker_factory = get_sessionmaker()
            db = sessionmaker_factory()
            
            # Test database connectivity
            db.execute(text("SELECT 1"))
            
            # Create super_admin role if it doesn't exist
            super_admin_role = db.query(Role).filter(Role.name == "super_admin").first()
            if not super_admin_role:
                super_admin_role = Role(
                    id=str(uuid4()),
                    name="super_admin",
                    description="Super Administrator with all permissions"
                )
                db.add(super_admin_role)
                db.commit()
                logger.info("Created super_admin role")
            
            # Create candidate role if it doesn't exist
            candidate_role = db.query(Role).filter(Role.name == "candidate").first()
            if not candidate_role:
                candidate_role = Role(
                    id=str(uuid4()),
                    name="candidate",
                    description="Job candidate user"
                )
                db.add(candidate_role)
                db.commit()
                logger.info("Created candidate role")
            
            # Create employer_admin role if it doesn't exist
            employer_admin_role = db.query(Role).filter(Role.name == "employer_admin").first()
            if not employer_admin_role:
                employer_admin_role = Role(
                    id=str(uuid4()),
                    name="employer_admin",
                    description="Employer administrator"
                )
                db.add(employer_admin_role)
                db.commit()
                logger.info("Created employer_admin role")
            
            # Create employer_recruiter role if it doesn't exist
            employer_recruiter_role = db.query(Role).filter(Role.name == "employer_recruiter").first()
            if not employer_recruiter_role:
                employer_recruiter_role = Role(
                    id=str(uuid4()),
                    name="employer_recruiter",
                    description="Employer recruiter"
                )
                db.add(employer_recruiter_role)
                db.commit()
                logger.info("Created employer_recruiter role")
            
            # Check if the super admin user already exists
            initial_admin_email = os.getenv("INITIAL_ADMIN_EMAIL", "devarajpadma.work@gmail.com")
            super_admin_user = db.query(User).filter(User.email == initial_admin_email).first()
            
            if not super_admin_user:
                # Get initial admin password from environment variable
                initial_admin_password = os.getenv("INITIAL_ADMIN_PASSWORD", "defaultadmin123")  # Default password
                hashed_password = get_password_hash(initial_admin_password)
                
                # Create the super admin user with a generated ID and default password
                super_admin_user = User(
                    id=str(uuid4()),
                    email=initial_admin_email,
                    name="Super Admin",
                    hashed_password=hashed_password,
                    role="super_admin",  # Direct role assignment
                    is_active=True
                )
                db.add(super_admin_user)
                db.commit()
                logger.info(f"Created super admin user with email: {initial_admin_email}")
            else:
                logger.info(f"Super admin user already exists with email: {initial_admin_email}")
                # Check if the existing admin user has a password, and if not, add one
                if not super_admin_user.hashed_password:
                    logger.info("Admin user exists but doesn't have a password. Adding password...")
                    initial_admin_password = os.getenv("INITIAL_ADMIN_PASSWORD", "defaultadmin123")  # Default password
                    hashed_password = get_password_hash(initial_admin_password)
                    
                    # Update the existing user with the hashed password
                    super_admin_user.hashed_password = hashed_password
                    db.commit()
                    logger.info("Password added to existing admin user")
                else:
                    logger.info("Admin user already has a password and can be used for authentication")
                    
            db.close()
            logger.info("Database initialization completed successfully")
            return  # Success, exit the retry loop
            
        except SQLAlchemyError as e:
            if 'db' in locals():
                db.close()
            logger.error(f"Database connection error during initialization (attempt {attempt + 1}/{max_retries}): {str(e)}")
            if attempt < max_retries - 1:
                time.sleep(5)  # Wait 5 seconds before retrying
            else:
                logger.error("Failed to initialize database after maximum retries")
                raise
        except Exception as e:
            logger.error(f"Unexpected error during database initialization: {str(e)}")
            if 'db' in locals():
                db.close()
            raise
    
    logger.info("Database initialization completed after retries")


if __name__ == "__main__":
    init_db()