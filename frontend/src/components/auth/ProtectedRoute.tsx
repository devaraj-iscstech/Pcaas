'use client';

import React from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['candidate', 'employer_admin', 'employer_recruiter', 'super_admin'] 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to unauthorized page if user doesn't have required role
      router.push('/unauthorized');
    }
  }, [isAuthenticated, isLoading, user, router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // The redirect happens in useEffect
  }

  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return null; // The redirect happens in useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;