import pyotp
import qrcode
from io import BytesIO
import base64
import secrets
from typing import Optional
from sqlalchemy.orm import Session
from uuid import uuid4
from ..models.candidate import CandidateMFA
from ..models.employer import EmployerMFA
from ..models.candidate import Candidate
from ..models.employer import Employer


class MFAService:
    def __init__(self, db: Session):
        self.db = db

    def generate_secret_key(self) -> str:
        """Generate a new TOTP secret key"""
        return pyotp.random_base32()

    def generate_backup_codes(self, count: int = 10) -> list[str]:
        """Generate backup codes for MFA"""
        return [secrets.token_urlsafe(8) for _ in range(count)]

    def generate_qr_code(self, secret_key: str, email: str, issuer_name: str = "PCaaS") -> str:
        """Generate QR code for TOTP setup"""
        totp_uri = pyotp.totp.TOTP(secret_key).provisioning_uri(
            name=email,
            issuer_name=issuer_name
        )
        
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(totp_uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        qr_code_bytes = buffer.getvalue()
        qr_code_base64 = base64.b64encode(qr_code_bytes).decode()
        
        return f"data:image/png;base64,{qr_code_base64}"

    def verify_token(self, secret_key: str, token: str) -> bool:
        """Verify the TOTP token"""
        totp = pyotp.TOTP(secret_key)
        return totp.verify(token, valid_window=1)  # Allow one-time window for drift

    def setup_candidate_mfa(self, candidate_id: str, email: str) -> dict:
        """Setup MFA for a candidate"""
        secret_key = self.generate_secret_key()
        backup_codes = self.generate_backup_codes()
        qr_code_url = self.generate_qr_code(secret_key, email)
        
        return {
            "qr_code_url": qr_code_url,
            "secret_key": secret_key,
            "backup_codes": backup_codes
        }

    def setup_employer_mfa(self, employer_id: str, email: str) -> dict:
        """Setup MFA for an employer"""
        secret_key = self.generate_secret_key()
        backup_codes = self.generate_backup_codes()
        qr_code_url = self.generate_qr_code(secret_key, email)
        
        return {
            "qr_code_url": qr_code_url,
            "secret_key": secret_key,
            "backup_codes": backup_codes
        }

    def enable_candidate_mfa(self, candidate_id: str, token: str, setup_secret_key: str) -> bool:
        """Enable MFA for a candidate after verification"""
        if not self.verify_token(setup_secret_key, token):
            return False
        
        # Check if MFA record already exists
        existing_mfa = self.db.query(CandidateMFA).filter(CandidateMFA.candidate_id == candidate_id).first()
        
        if existing_mfa:
            # Update existing MFA record
            existing_mfa.secret_key = setup_secret_key  # Use the verified secret key
            existing_mfa.is_enabled = True
            # Generate new backup codes
            backup_codes = self.generate_backup_codes()
            existing_mfa.backup_codes = str(backup_codes)  # Store as string representation
        else:
            # Create new MFA record
            backup_codes = self.generate_backup_codes()
            candidate_mfa = CandidateMFA(
                id=str(uuid4()),
                candidate_id=candidate_id,
                secret_key=setup_secret_key,  # Use the verified secret key
                is_enabled=True,
                backup_codes=str(backup_codes)  # Store as string representation
            )
            self.db.add(candidate_mfa)
        
        self.db.commit()
        return True

    def enable_employer_mfa(self, employer_id: str, token: str, setup_secret_key: str) -> bool:
        """Enable MFA for an employer after verification"""
        if not self.verify_token(setup_secret_key, token):
            return False
        
        # Check if MFA record already exists
        existing_mfa = self.db.query(EmployerMFA).filter(EmployerMFA.employer_id == employer_id).first()
        
        if existing_mfa:
            # Update existing MFA record
            existing_mfa.secret_key = setup_secret_key  # Use the verified secret key
            existing_mfa.is_enabled = True
            # Generate new backup codes
            backup_codes = self.generate_backup_codes()
            existing_mfa.backup_codes = str(backup_codes)  # Store as string representation
        else:
            # Create new MFA record
            backup_codes = self.generate_backup_codes()
            employer_mfa = EmployerMFA(
                id=str(uuid4()),
                employer_id=employer_id,
                secret_key=setup_secret_key,  # Use the verified secret key
                is_enabled=True,
                backup_codes=str(backup_codes)  # Store as string representation
            )
            self.db.add(employer_mfa)
        
        self.db.commit()
        return True

    def verify_candidate_mfa(self, candidate_id: str, token: str) -> bool:
        """Verify MFA for a candidate"""
        candidate_mfa = self.db.query(CandidateMFA).filter(
            CandidateMFA.candidate_id == candidate_id,
            CandidateMFA.is_enabled == True
        ).first()
        
        if not candidate_mfa:
            return False
        
        return self.verify_token(candidate_mfa.secret_key, token)

    def verify_employer_mfa(self, employer_id: str, token: str) -> bool:
        """Verify MFA for an employer"""
        employer_mfa = self.db.query(EmployerMFA).filter(
            EmployerMFA.employer_id == employer_id,
            EmployerMFA.is_enabled == True
        ).first()
        
        if not employer_mfa:
            return False
        
        return self.verify_token(employer_mfa.secret_key, token)