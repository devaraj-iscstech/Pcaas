from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "postgresql://user:password@localhost/pcaas"
    MONGODB_URL: str = "mongodb://localhost:27017/pcaas"
    REDIS_URL: str = "redis://localhost:6379"
    
    # Authentication settings
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # OAuth settings
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""
    FRONTEND_URL: str = "http://localhost:3000"
    BACKEND_URL: str = "http://localhost:8000"
    
    # Application settings
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]
    DEBUG: bool = False
    
    class Config:
        env_file = ".env"


settings = Settings()