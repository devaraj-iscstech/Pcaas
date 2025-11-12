# PCaaS Backend - New Features Documentation

## Super Admin Setup

The system automatically creates a super admin account on first startup using the `INITIAL_ADMIN_EMAIL` from the `.env` file.

Environment variable:
```
INITIAL_ADMIN_EMAIL=devarajpadma.work@gmail.com
```

## User Registration

### Candidate Registration
- Endpoint: `POST /api/v1/register/candidate`
- Creates both a User account and a Candidate profile
- Requires: first_name, last_name, email, password, and other candidate-specific fields

### Employer Registration  
- Endpoint: `POST /api/v1/register/employer`
- Creates both a User account and an Employer profile
- Requires: company_name, contact person details, email, password, and other employer-specific fields

## Multi-Factor Authentication (MFA)

### MFA Setup
- Candidate: `POST /api/v1/mfa/setup/candidate/{candidate_id}`
- Employer: `POST /api/v1/mfa/setup/employer/{employer_id}`
- Returns QR code URL, secret key, and backup codes

### MFA Enable
- Candidate: `POST /api/v1/mfa/enable/candidate/{candidate_id}`
- Employer: `POST /api/v1/mfa/enable/employer/{employer_id}`
- Requires the current TOTP token and the setup secret key

## Database Schema Changes

### New Tables
- `candidates` - Stores candidate profile information
- `employers` - Stores employer/company information
- `candidate_mfa` - Stores MFA secrets for candidates
- `employer_mfa` - Stores MFA secrets for employers

### Updated Tables
- `users` - Now has relationships to candidate or employer profiles
- `roles` - Includes candidate, employer_admin, employer_recruiter, and super_admin roles

## Security Features

- Passwords are hashed using bcrypt
- TOTP-based MFA with QR code setup
- Role-based access control
- Email uniqueness constraints
- Proper input validation with Pydantic schemas