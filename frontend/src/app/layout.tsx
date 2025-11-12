'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { AuthProvider } from '../components/auth/AuthProvider';
import { store } from '../store/store'; // Assuming you'll create this store file
import '../styles/globals.css';

// Import a basic CSS framework or your own styles
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Provider store={store}>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50">
              <main>
                {children}
              </main>
            </div>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}