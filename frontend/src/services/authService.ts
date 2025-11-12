// AuthService.ts - Frontend service to handle authentication requests

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

class AuthService {
  // Get current user profile
  static async getCurrentUser(): Promise<any> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch user profile');
    }

    return await response.json();
  }

  // Get user roles
  static async getUserRoles(): Promise<string[]> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/roles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch user roles');
    }

    const data = await response.json();
    return data.roles;
  }

  // Logout user
  static async logout(): Promise<void> {
    // Clear tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // In a real implementation, you might also want to call a backend logout endpoint
    // await fetch(`${API_BASE_URL}/logout`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //   },
    // });
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // In a real implementation, you might also want to validate if the token is expired
    return !!token;
  }

  // Get auth headers with token
  static getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
}

export default AuthService;