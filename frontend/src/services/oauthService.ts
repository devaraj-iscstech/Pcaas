import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface LoginRequest {
  email: string;
  password: string;
  role: 'candidate' | 'employer';
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'candidate' | 'employer';
  companyName?: string; // For employers
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer';
  verified: boolean;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

class OAuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiryTime: number | null = null;

  constructor() {
    // Load tokens from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('access_token');
      this.refreshToken = localStorage.getItem('refresh_token');
      const expiry = localStorage.getItem('token_expiry');
      this.tokenExpiryTime = expiry ? parseInt(expiry) : null;
    }
  }

  // Login with OAuth
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      const data: AuthResponse = response.data;

      // Store tokens
      this.setTokens(data.tokens);

      // Store user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Register new user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      const data: AuthResponse = response.data;

      // Store tokens
      this.setTokens(data.tokens);

      // Store user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate refresh token on server
      if (this.refreshToken) {
        await axios.post(
          `${API_BASE_URL}/auth/logout`,
          { refreshToken: this.refreshToken },
          this.getAuthHeaders()
        );
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all tokens and user data
      this.clearTokens();
    }
  }

  // Refresh access token
  async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken: this.refreshToken,
      });

      const tokens: AuthTokens = response.data.tokens;
      this.setTokens(tokens);

      return tokens.accessToken;
    } catch (error: any) {
      // If refresh fails, clear all tokens and redirect to login
      this.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
      throw new Error('Session expired. Please login again.');
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.accessToken && !!this.getCurrentUser();
  }

  // Get access token
  getAccessToken(): string | null {
    return this.accessToken;
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  // Check if token is expired or about to expire (within 5 minutes)
  isTokenExpired(): boolean {
    if (!this.tokenExpiryTime) return true;
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return now >= this.tokenExpiryTime - fiveMinutes;
  }

  // Get authorization headers
  getAuthHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    };
  }

  // Make authenticated request with automatic token refresh
  async makeAuthenticatedRequest<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: any
  ): Promise<T> {
    // Check if token needs refresh
    if (this.isTokenExpired()) {
      await this.refreshAccessToken();
    }

    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${url}`,
        data,
        ...this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      // If we get 401, try refreshing token once
      if (error.response?.status === 401) {
        try {
          await this.refreshAccessToken();
          // Retry the request
          const response = await axios({
            method,
            url: `${API_BASE_URL}${url}`,
            data,
            ...this.getAuthHeaders(),
          });
          return response.data;
        } catch (refreshError) {
          // If refresh fails, redirect to login
          this.clearTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
          throw refreshError;
        }
      }
      throw error;
    }
  }

  // Store tokens
  private setTokens(tokens: AuthTokens): void {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;

    // Calculate expiry time
    const expiryTime = Date.now() + tokens.expiresIn * 1000;
    this.tokenExpiryTime = expiryTime;

    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', tokens.accessToken);
      localStorage.setItem('refresh_token', tokens.refreshToken);
      localStorage.setItem('token_expiry', expiryTime.toString());
    }
  }

  // Clear all tokens
  private clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiryTime = null;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token_expiry');
      localStorage.removeItem('user');
    }
  }
}

export const authService = new OAuthService();
