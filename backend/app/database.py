from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# PostgreSQL setup
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# The Base class definition doesn't require engine connection
Base = declarative_base()

# We'll create engine and SessionLocal lazily when first needed
_engine = None
_SessionLocal = None

def get_engine():
    global _engine
    if _engine is None:
        _engine = create_engine(SQLALCHEMY_DATABASE_URL)
    return _engine

def get_sessionmaker():
    global _SessionLocal
    if _SessionLocal is None:
        _SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=get_engine())
    return _SessionLocal

def get_db():
    db = get_sessionmaker()()
    try:
        yield db
    finally:
        db.close()

# Return functions for lazy access
engine = get_engine
SessionLocal = get_sessionmaker