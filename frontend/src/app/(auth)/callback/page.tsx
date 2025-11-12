'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../components/auth/AuthProvider';

const CallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading } = useAuth();
  const { login } = useAuth(); // This will handle the actual Auth0 flow

  useEffect(() => {
    const handleCallback = async () => {
      // Get the authorization code from the URL
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (code) {
        try {
          // Exchange the code for tokens
          const response = await fetch('/api/auth/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, state }),
          });

          if (response.ok) {
            const data = await response.json();
            
            // Store tokens in localStorage
            if (data.access_token) {
              localStorage.setItem('access_token', data.access_token);
              // Redirect to dashboard or previous location
              router.push('/dashboard');
            } else {
              // Handle error
              console.error('No access token received');
              router.push('/login?error=auth_failed');
            }
          } else {
            // Handle error response
            const errorData = await response.json();
            console.error('Auth callback error:', errorData);
            router.push('/login?error=auth_failed');
          }
        } catch (error) {
          console.error('Error during callback:', error);
          router.push('/login?error=auth_failed');
        }
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Completing authentication...</h2>
        <p className="text-gray-600 mt-2">Please wait while we verify your credentials</p>
      </div>
    </div>
  );
};

export default CallbackPage;