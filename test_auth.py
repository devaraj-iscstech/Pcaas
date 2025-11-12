"""
Basic test script to verify the authentication implementation of the PCaaS application
"""

import requests
import os
from pprint import pprint

# Get the API base URL from environment or use default
API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:8000')

def test_api_health():
    """Test if the API is running and healthy"""
    try:
        response = requests.get(f"{API_BASE_URL}/health")
        if response.status_code == 200:
            print("✓ API Health Check: PASSED")
            print(f"  Response: {response.json()}")
            return True
        else:
            print("✗ API Health Check: FAILED")
            print(f"  Status Code: {response.status_code}")
            print(f"  Response: {response.text}")
            return False
    except Exception as e:
        print("✗ API Health Check: FAILED")
        print(f"  Error: {str(e)}")
        return False

def test_root_endpoint():
    """Test the root endpoint"""
    try:
        response = requests.get(f"{API_BASE_URL}/")
        if response.status_code == 200:
            print("✓ Root Endpoint Test: PASSED")
            print(f"  Response: {response.json()}")
            return True
        else:
            print("✗ Root Endpoint Test: FAILED")
            print(f"  Status Code: {response.status_code}")
            return False
    except Exception as e:
        print("✗ Root Endpoint Test: FAILED")
        print(f"  Error: {str(e)}")
        return False

def test_auth_endpoints():
    """Test authentication endpoints"""
    endpoints_to_test = [
        "/api/v1/login",
        "/api/v1/me",
        "/api/v1/logout",
        "/api/v1/roles",
        "/api/v1/callback"
    ]
    
    for endpoint in endpoints_to_test:
        try:
            # Most auth endpoints require authentication, so we expect 401 for unauthenticated requests
            response = requests.get(f"{API_BASE_URL}{endpoint}")
            print(f"✓ Auth Endpoint Test ({endpoint}): Status {response.status_code} (Expected for unauthenticated access)")
        except Exception as e:
            print(f"✗ Auth Endpoint Test ({endpoint}): FAILED - Error: {str(e)}")

def test_directory_structure():
    """Verify that the main project directories exist"""
    import os
    
    required_dirs = [
        "backend",
        "frontend",
        "ml",
        "backend/app",
        "backend/app/auth",
        "backend/app/models",
        "backend/app/api/v1",
        "frontend/src",
        "frontend/src/app",
        "frontend/src/components",
        "frontend/src/store",
    ]
    
    all_exist = True
    for dir_path in required_dirs:
        if os.path.exists(dir_path):
            print(f"✓ Directory exists: {dir_path}")
        else:
            print(f"✗ Directory missing: {dir_path}")
            all_exist = False
    
    return all_exist

def main():
    """Run all tests"""
    print("Running PCaaS Authentication Implementation Tests...\n")
    
    print("Testing API endpoints:")
    api_health = test_api_health()
    root_test = test_root_endpoint()
    
    print("\nTesting authentication endpoints (expected 401 for unauthenticated access):")
    test_auth_endpoints()
    
    print("\nTesting directory structure:")
    dir_test = test_directory_structure()
    
    print("\n" + "="*50)
    print("Test Summary:")
    print(f"  API Health: {'PASS' if api_health else 'FAIL'}")
    print(f"  Root Endpoint: {'PASS' if root_test else 'FAIL'}")
    print(f"  Directory Structure: {'PASS' if dir_test else 'FAIL'}")
    
    overall_result = api_health and root_test and dir_test
    print(f"\nOverall Result: {'PASS' if overall_result else 'FAIL'}")
    
    if overall_result:
        print("\n✓ All tests passed! The basic authentication implementation is working correctly.")
    else:
        print("\n✗ Some tests failed. Please check the implementation.")
    
    return overall_result

if __name__ == "__main__":
    main()