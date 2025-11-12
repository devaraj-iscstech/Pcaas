from fastapi import APIRouter, HTTPException, status, Request, Query
from fastapi.responses import RedirectResponse
from typing import Any
import httpx
from ...config import settings
from ...auth.utils import create_access_token, create_refresh_token
from datetime import timedelta
from ...auth.schemas import Token
from ...services.auth_service import AuthService, get_auth_service
from sqlalchemy.orm import Session
from ...database import get_db
import urllib.parse
import logging

# Set up logging
logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/login/{provider}")
async def oauth_login(provider: str, request: Request):
    """
    Initiate OAuth2 login with specified provider
    """
    # Validate that the required settings are available
    if provider == "google":
        if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
            raise HTTPException(status_code=500, detail="Google OAuth is not properly configured")
        
        redirect_uri = f"{request.base_url}api/v1/oauth/callback/google"
        google_auth_url = (
            f"https://accounts.google.com/o/oauth/2/v2/auth?"
            f"client_id={settings.GOOGLE_CLIENT_ID}&"
            f"redirect_uri={redirect_uri}&"
            f"response_type=code&"
            f"scope=openid email profile&"
            f"access_type=offline"
        )
        logger.info(f"Initiating Google OAuth login, redirecting to: {google_auth_url}")
        return RedirectResponse(url=google_auth_url)
    
    elif provider == "github":
        if not settings.GITHUB_CLIENT_ID or not settings.GITHUB_CLIENT_SECRET:
            raise HTTPException(status_code=500, detail="GitHub OAuth is not properly configured")
        
        redirect_uri = f"{request.base_url}api/v1/oauth/callback/github"
        github_auth_url = (
            f"https://github.com/login/oauth/authorize?"
            f"client_id={settings.GITHUB_CLIENT_ID}&"
            f"redirect_uri={redirect_uri}&"
            f"scope=user:email"
        )
        logger.info(f"Initiating GitHub OAuth login, redirecting to: {github_auth_url}")
        return RedirectResponse(url=github_auth_url)
    
    else:
        raise HTTPException(status_code=400, detail=f"Provider {provider} not supported")


@router.get("/callback/{provider}")
async def oauth_callback(
    provider: str, 
    code: str = Query(...), 
    state: str = Query(None)
):
    """
    Handle OAuth2 callback from specified provider
    """
    if not code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Authorization code is required"
        )
    
    if provider == "google":
        # Validate Google OAuth settings
        if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
            raise HTTPException(status_code=500, detail="Google OAuth is not properly configured")
        # Get database session
        db: Session = next(get_db())
        try:
            auth_service = AuthService(db)
            
            # Exchange authorization code for access token
            token_url = "https://oauth2.googleapis.com/token"
            redirect_uri = f"{settings.BACKEND_URL}/api/v1/oauth/callback/google"
            
            token_data = {
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": redirect_uri
            }
            
            logger.info(f"Exchanging authorization code for Google access token")
            async with httpx.AsyncClient() as client:
                response = await client.post(token_url, data=token_data)
                
                if response.status_code != 200:
                    logger.error(f"Failed to exchange code for Google tokens: {response.text}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Failed to exchange authorization code for tokens"
                    )
                
                tokens = response.json()
                access_token = tokens.get("access_token")
                
                if not access_token:
                    logger.error(f"No access token received from Google: {tokens}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="No access token received from Google"
                    )
                
                # Get user info from Google
                logger.info(f"Fetching user info from Google")
                user_info_response = await client.get(
                    "https://www.googleapis.com/oauth2/v2/userinfo",
                    headers={"Authorization": f"Bearer {access_token}"}
                )
                
                if user_info_response.status_code != 200:
                    logger.error(f"Failed to get user info from Google: {user_info_response.text}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Failed to get user information from Google"
                    )
                
                user_info = user_info_response.json()
                
                # Validate required user info
                if not user_info.get("email"):
                    logger.error(f"No email found in Google user info: {user_info}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Email not provided by Google"
                    )
                
                # Check if user already exists
                existing_user = auth_service.get_user_by_email(user_info.get("email"))
                
                if existing_user:
                    logger.info(f"Existing user found: {user_info.get('email')}")
                    # User already exists, log them in
                    user = existing_user
                else:
                    logger.info(f"Creating new user: {user_info.get('email')}")
                    # Create new user
                    user = auth_service.create_user(
                        email=user_info.get("email"),
                        name=user_info.get("name", user_info.get("email").split("@")[0]),  # Use email prefix as name if name not provided
                        password="",  # No password for OAuth users
                        role="candidate"  # Default role for OAuth users
                    )
                
                # Generate JWT tokens
                access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
                refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
                
                jwt_access_token = create_access_token(
                    data={"sub": user.id, "roles": [user.role]}, 
                    expires_delta=access_token_expires
                )
                
                jwt_refresh_token = create_refresh_token(
                    data={"sub": user.id, "roles": [user.role]}, 
                    expires_delta=refresh_token_expires
                )
                
                # Redirect to frontend with tokens
                redirect_params = urllib.parse.urlencode({
                    "access_token": jwt_access_token,
                    "refresh_token": jwt_refresh_token,
                    "token_type": "bearer"
                })
                
                frontend_url = f"{settings.FRONTEND_URL}/auth/callback?{redirect_params}"
                return RedirectResponse(url=frontend_url)
                
        finally:
            db.close()
    
    elif provider == "github":
        # Validate GitHub OAuth settings
        if not settings.GITHUB_CLIENT_ID or not settings.GITHUB_CLIENT_SECRET:
            raise HTTPException(status_code=500, detail="GitHub OAuth is not properly configured")
        
        # Get database session
        db: Session = next(get_db())
        try:
            auth_service = AuthService(db)
            
            # Exchange authorization code for access token
            token_url = "https://github.com/login/oauth/access_token"
            redirect_uri = f"{settings.BACKEND_URL}/api/v1/oauth/callback/github"
            
            token_data = {
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": redirect_uri
            }
            
            logger.info(f"Exchanging authorization code for GitHub access token")
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    token_url,
                    data=token_data,
                    headers={"Accept": "application/json"}
                )
                
                if response.status_code != 200:
                    logger.error(f"Failed to exchange code for GitHub tokens: {response.text}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Failed to exchange authorization code for tokens"
                    )
                
                tokens = response.json()
                access_token = tokens.get("access_token")
                
                if not access_token:
                    logger.error(f"No access token received from GitHub: {tokens}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Access token not received from GitHub"
                    )
                
                # Get user info from GitHub
                logger.info(f"Fetching user info from GitHub")
                user_headers = {"Authorization": f"Bearer {access_token}"}
                user_response = await client.get(
                    "https://api.github.com/user",
                    headers=user_headers
                )
                
                if user_response.status_code != 200:
                    logger.error(f"Failed to get user info from GitHub: {user_response.text}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Failed to get user information from GitHub"
                    )
                
                user_info = user_response.json()
                
                # Also get user's email from GitHub (public or private)
                emails_response = await client.get(
                    "https://api.github.com/user/emails",
                    headers=user_headers
                )
                
                user_email = None
                if emails_response.status_code == 200:
                    emails = emails_response.json()
                    # Find primary/public email
                    for email_obj in emails:
                        if email_obj.get("primary", False) and email_obj.get("verified", False):
                            user_email = email_obj.get("email")
                            break
                    # If no primary email found, use the first verified email
                    if not user_email:
                        for email_obj in emails:
                            if email_obj.get("verified", False):
                                user_email = email_obj.get("email")
                                break
                # If still no email, try to use the email from user_info
                if not user_email:
                    user_email = user_info.get("email", f"{user_info.get('login', 'user')}@users.noreply.github.com")
                
                if not user_email:
                    logger.error(f"No email found for GitHub user: {user_info}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Email not provided by GitHub"
                    )
                
                name = user_info.get("name", user_info.get("login", user_email.split("@")[0]))
                
                # Check if user already exists
                existing_user = auth_service.get_user_by_email(user_email)
                
                if existing_user:
                    logger.info(f"Existing user found: {user_email}")
                    # User already exists, log them in
                    user = existing_user
                else:
                    logger.info(f"Creating new user: {user_email}")
                    # Create new user
                    user = auth_service.create_user(
                        email=user_email,
                        name=name,
                        password="",  # No password for OAuth users
                        role="candidate"  # Default role for OAuth users
                    )
                
                # Generate JWT tokens
                access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
                refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
                
                jwt_access_token = create_access_token(
                    data={"sub": user.id, "roles": [user.role]}, 
                    expires_delta=access_token_expires
                )
                
                jwt_refresh_token = create_refresh_token(
                    data={"sub": user.id, "roles": [user.role]}, 
                    expires_delta=refresh_token_expires
                )
                
                # Redirect to frontend with tokens
                redirect_params = urllib.parse.urlencode({
                    "access_token": jwt_access_token,
                    "refresh_token": jwt_refresh_token,
                    "token_type": "bearer"
                })
                
                frontend_url = f"{settings.FRONTEND_URL}/auth/callback?{redirect_params}"
                logger.info(f"OAuth successful, redirecting to frontend: {frontend_url}")
                return RedirectResponse(url=frontend_url)
                
        except HTTPException:
            # Re-raise HTTP exceptions as they are
            raise
        except Exception as e:
            logger.error(f"Unexpected error during GitHub OAuth: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An error occurred during GitHub authentication"
            )
        finally:
            db.close()
    
    else:
        raise HTTPException(status_code=400, detail=f"Provider {provider} not supported")


# Optional: Endpoint to register OAuth user with additional info
@router.post("/register/{provider}")
async def oauth_register(provider: str, request: Request) -> Any:
    """
    Additional registration step for OAuth users if needed
    """
    return {"message": f"Additional registration for {provider} users"}