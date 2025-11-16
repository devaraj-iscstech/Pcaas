'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading PCaaS...</p>
      </div>
    </div>
  );
}
