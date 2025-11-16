'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/oauthService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'candidate' | 'employer' | 'admin';
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/auth/login',
}) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const isAuthenticated = authService.isAuthenticated();

        if (!isAuthenticated) {
          // Not authenticated, redirect to login
          router.push(redirectTo);
          return;
        }

        // Check token expiry and refresh if needed
        if (authService.isTokenExpired()) {
          try {
            await authService.refreshAccessToken();
          } catch (error) {
            // Token refresh failed, redirect to login
            router.push(redirectTo);
            return;
          }
        }

        // Check role if required
        if (requiredRole) {
          const user = authService.getCurrentUser();
          if (!user || user.role !== requiredRole) {
            // Wrong role, redirect to appropriate page
            if (user?.role === 'candidate') {
              router.push('/candidate');
            } else if (user?.role === 'employer') {
              router.push('/employer');
            } else {
              router.push(redirectTo);
            }
            return;
          }
        }

        // All checks passed
        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push(redirectTo);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole, redirectTo, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Show content if authorized
  if (isAuthorized) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
};
