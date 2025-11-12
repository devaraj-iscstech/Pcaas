import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:8000'}/api/v1/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        code, 
        state 
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return NextResponse.json({ error: errorData.detail || 'Failed to exchange code for tokens' }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();
    
    // Store the token in a cookie or sessionStorage for client-side access
    // Note: In a real implementation, you'd want to securely store these tokens
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    response.cookies.set('access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}