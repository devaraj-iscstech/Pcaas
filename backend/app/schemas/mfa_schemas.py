from pydantic import BaseModel
from typing import List, Optional


class MFASetupResponse(BaseModel):
    qr_code_url: str
    secret_key: str
    backup_codes: List[str]


class MFAVerifyRequest(BaseModel):
    token: str
    secret_key: str


class MFAEnableRequest(BaseModel):
    token: str
    setup_secret_key: str  # The secret key from the setup phase