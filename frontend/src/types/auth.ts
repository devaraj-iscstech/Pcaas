export interface User {
  id: string;
  email: string;
  name: string;
  role: string; // 'candidate', 'employer_admin', 'employer_recruiter', 'super_admin'
  is_active: boolean;
  created_at: string;
  picture?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}