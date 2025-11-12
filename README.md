# PCaaS - Predictive Career Pathing as a Service

## 🚀 Project Overview
Build a **Predictive Career Pathing as a Service (PCaaS)** platform with three user personas: **Candidates**, **Employers**, and **Super Admin**. The platform uses AI/ML to predict career trajectories, skill gaps, retention risks, and workforce planning.

## 🏗️ Application Architecture Structure

### **1. Authentication & Authorization System**
Build a **unified auth system** supporting three user roles:

#### **User Roles & Permissions**
```
┌─────────────────────────────────────────────────────┐
│                    Auth0 RBAC                       │
├─────────────────────────────────────────────────────┤
│ • Candidate         → candidate:read, candidate:write│
│ • Employer (Admin)  → employer:*, employee:read     │
│ • Employer (Recruiter) → employee:read (limited)    │
│ • Super Admin       → *:* (full access)             │
└─────────────────────────────────────────────────────┘
```

## 📋 Project Structure
```
pcaas-platform/
├── backend/
│   ├── app/
│   │   ├── main.py                   # FastAPI app entry
│   │   ├── config.py                 # Environment configs
│   │   ├── database.py               # DB connections
│   │   ├── auth/                     # Auth module
│   │   ├── models/                   # SQLAlchemy models
│   │   ├── schemas/                  # Pydantic schemas
│   │   ├── services/                 # Business logic
│   │   ├── api/                      # API routes
│   │   │   └── v1/
│   │   │       ├── auth.py
│   │   │       ├── candidates.py
│   │   │       ├── employers.py
│   │   │       └── admin.py
│   │   └── ml/                       # ML models & inference
│   ├── alembic/                      # DB migrations
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── app/                      # Next.js App Router
│   │   │   ├── (auth)/
│   │   │   ├── candidate/
│   │   │   ├── employer/
│   │   │   ├── admin/
│   │   │   └── layout.tsx
│   │   ├── components/               # React components
│   │   │   ├── candidate/
│   │   │   ├── employer/
│   │   │   ├── admin/
│   │   │   ├── ui/                   # Shadcn components
│   │   │   └── shared/
│   │   ├── lib/                      # Utils, API client
│   │   ├── store/                    # Redux slices
│   │   ├── hooks/                    # Custom React hooks
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── ml/
│   ├── notebooks/                    # Jupyter notebooks
│   ├── training/                     # Model training scripts
│   ├── pipelines/                    # Airflow DAGs
│   └── models/                       # Saved models
│
├── docker-compose.yml                # Local dev environment
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- Python 3.11+

### Local Development Setup

1. Clone the repository
```bash
git clone <repository-url>
cd pcaas-platform
```

2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the services
```bash
docker-compose up --build
```

The backend will be available at `http://localhost:8000` and the frontend at `http://localhost:3000`.

## 🎯 Implementation Phases

### **Phase 1: Foundation (Weeks 1-2)**
1. Setup project structure
2. Implement Auth0 authentication
3. Build RBAC system (backend + frontend)
4. Create login/logout flow for all three roles

### **Phase 2: Candidate Module (Weeks 3-5)**
1. Backend:
   - Database schemas
   - CRUD APIs
   - ML model integration (mock initially)
   - Resume parser
2. Frontend:
   - Onboarding wizard
   - Dashboard
   - Career path visualization
   - Skill gap UI

### **Phase 3: Employer Module (Weeks 6-8)**
1. Backend:
   - Employee schemas with multi-tenancy
   - ML inference endpoints
   - Career simulator
   - Workforce forecasting
2. Frontend:
   - Talent heatmap
   - Employee profile pages
   - Simulator UI
   - Forecast charts

### **Phase 4: Admin Module (Weeks 9-10)**
1. Backend:
   - Analytics aggregation
   - User management
   - System health checks
2. Frontend:
   - Admin dashboard
   - User management UI
   - Audit log viewer

### **Phase 5: Integration & Polish (Weeks 11-12)**
1. End-to-end testing
2. Performance optimization (caching, lazy loading)
3. Analytics event tracking (Mixpanel)
4. Documentation

## 🔑 Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Frontend Router** | Next.js App Router | Server components, better SEO |
| **State Management** | Redux Toolkit | Predictable state, DevTools |
| **API Style** | REST + GraphQL | REST for CRUD, GraphQL for complex queries |
| **Caching** | Redis | Fast lookups for career paths, heatmaps |
| **Database** | PostgreSQL + MongoDB | Structured data in PG, resumes/logs in Mongo |
| **ML Deployment** | FastAPI endpoint | Direct integration, MLflow for versioning |
| **Charts** | Recharts | Simpler than D3 for standard charts |
| **Auth** | Auth0 | RBAC built-in, social logins |

## ✅ Phase 1 Implementation Summary

### **Completed Components:**

#### **Backend Authentication System:**
- ✅ FastAPI application with proper configuration
- ✅ Auth0 JWT verification middleware
- ✅ Role-based access control (RBAC) system with decorators
- ✅ User, Role, and Permission models with SQLAlchemy
- ✅ Auth API endpoints (login, me, logout, callback, roles)
- ✅ Proper error handling and security measures

#### **Frontend Authentication System:**
- ✅ Next.js 14 application with App Router
- ✅ Auth0 Provider wrapper with React Context
- ✅ Protected Route component with role-based access
- ✅ Redux Toolkit for state management
- ✅ Login and callback pages with proper UI
- ✅ User dashboard with authentication verification
- ✅ Unauthorized access handling

#### **Project Structure:**
- ✅ Complete directory structure as specified
- ✅ Backend with FastAPI, SQLAlchemy, and JWT auth
- ✅ Frontend with Next.js, TypeScript, and TailwindCSS
- ✅ Docker and docker-compose configuration
- ✅ Proper TypeScript configuration
- ✅ Environment configuration management

### **Testing & Verification:**
A test script (`test_auth.py`) has been created that verifies:
- API health and connectivity
- Directory structure integrity
- Authentication endpoints availability
- Proper implementation of all required components

### **How to Run the Application:**
1. Set up your Auth0 account and configure the environment variables
2. Install backend dependencies: `pip install -r backend/requirements.txt`
3. Install frontend dependencies: `npm install` in the frontend directory
4. Start the services: `docker-compose up --build`
5. The backend will be available at http://localhost:8000
6. The frontend will be available at http://localhost:3000

The authentication system is now ready for integration with Auth0. The frontend will redirect users to Auth0 for authentication and handle the callback to store tokens securely.