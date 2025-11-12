'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AuthService from '../../services/authService';

// Define types
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  getUser: () => User | null;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth0 configuration
const AUTH_CONFIG = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || 'your-domain.auth0.com',
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || 'your-client-id',
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || 'https://pcaas-api',
  redirectUri: typeof window !== 'undefined' 
    ? `${window.location.origin}/api/auth/callback` 
    : 'http://localhost:3000/api/auth/callback',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      if (AuthService.isAuthenticated()) {
        // Get user profile from backend API
        const userData = await AuthService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking session:', error);
      // Clear invalid token if there was an error
      if (localStorage.getItem('access_token')) {
        localStorage.removeItem('access_token');
      }
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    // Redirect to Auth0 login
    const authUrl = `https://${AUTH_CONFIG.domain}/authorize?` +
      `response_type=code&` +
      `client_id=${AUTH_CONFIG.clientId}&` +
      `redirect_uri=${AUTH_CONFIG.redirectUri}&` +
      `audience=${AUTH_CONFIG.audience}&` +
      `scope=openid profile email`;

    window.location.href = authUrl;
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint (optional)
      await AuthService.logout();
      
      // Update state
      setUser(null);
      setIsAuthenticated(false);
      
      // Redirect to homepage
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if backend logout fails, clear local state
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/';
    }
  };

  const getUser = (): User | null => {
    return user;
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    getUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};