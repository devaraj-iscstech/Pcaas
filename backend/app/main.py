from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import Base
from .initial_data import init_db
import logging

logger = logging.getLogger(__name__)

app = FastAPI(
    title="PCaaS API",
    description="Predictive Career Pathing as a Service",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include API routes (import here to avoid circular dependencies)
from .api.v1.auth import router as auth_router
from .api.v1.auth_callback import router as auth_callback_router
from .api.v1.oauth import router as oauth_router
from .api.v1.mfa import router as mfa_router

app.include_router(auth_router, prefix="/api/v1", tags=["auth"])
app.include_router(auth_callback_router, prefix="/api/v1", tags=["auth-callback"])
app.include_router(oauth_router, prefix="/api/v1", tags=["oauth"])
app.include_router(mfa_router, prefix="/api/v1", tags=["mfa"])

@app.get("/")
def root():
    return {"message": "Welcome to PCaaS API - Predictive Career Pathing as a Service"}

@app.get("/health")
def health_check():
    try:
        # Import models to register them with Base metadata (this registers table definitions)
        from . import models
        from .database import get_engine
        
        # Create database tables if they don't exist (using lazy-loaded engine)
        engine_instance = get_engine()
        Base.metadata.create_all(bind=engine_instance)
        
        # Initialize with default data (with retry logic)
        init_db()
        
        return {"status": "healthy"}
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {"status": "unhealthy", "error": str(e)}