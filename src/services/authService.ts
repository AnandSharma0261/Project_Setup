import { apiService } from './api';
import type { ApiResponse } from '../types/api.types';
import { API_ENDPOINTS, MOCK_CREDENTIALS } from '../constants/api';
import type { LoginRequest, LoginResponse } from '../types/auth';

export interface EmailValidationRequest {
  email: string;
}

export interface EmailValidationResponse {
  isValid: boolean;
  exists: boolean;
  message: string;
}

class AuthService {
  // Mock API call to validate email
  async validateEmail(email: string): Promise<ApiResponse<EmailValidationResponse>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock email validation logic
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const emailExists = email.toLowerCase() === MOCK_CREDENTIALS.USERNAME.toLowerCase();
      
      if (!isValidEmail) {
        return {
          success: false,
          data: {
            isValid: false,
            exists: false,
            message: 'Invalid email format'
          },
          message: 'Invalid email format',
          status: 400
        };
      }
      
      if (!emailExists) {
        return {
          success: false,
          data: {
            isValid: true,
            exists: false,
            message: 'Email address not found in our records'
          },
          message: 'Email address not found in our records',
          status: 404
        };
      }
      
      return {
        success: true,
        data: {
          isValid: true,
          exists: true,
          message: 'Email validated successfully'
        },
        message: 'Email validated successfully',
        status: 200
      };
      
    } catch (error: any) {
      throw {
        message: error.message || 'Email validation failed',
        status: error.status || 500,
      };
    }
  }

  // Mock API call for authentication
  async authenticateUser(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      const isValidEmail = credentials.email.toLowerCase() === MOCK_CREDENTIALS.USERNAME.toLowerCase();
      const isValidPassword = credentials.password === MOCK_CREDENTIALS.PASSWORD;
      
      if (!isValidEmail || !isValidPassword) {
        return {
          success: false,
          data: {} as LoginResponse,
          message: 'Invalid email or password',
          status: 401
        };
      }
      
      // Mock successful authentication response
      const loginResponse: LoginResponse = {
        user: {
          id: '1',
          email: credentials.email,
          name: 'Test User',
          role: 'admin',
          avatar: '',
          permissions: ['read', 'write', 'delete', 'admin'],
        },
        token: 'mock-jwt-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        refreshToken: 'mock-refresh-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        expiresIn: 3600,
      };
      
      return {
        success: true,
        data: loginResponse,
        message: 'Authentication successful',
        status: 200
      };
      
    } catch (error: any) {
      throw {
        message: error.message || 'Authentication failed',
        status: error.status || 500,
      };
    }
  }

  // Real API calls (for future implementation)
  async validateEmailAPI(email: string): Promise<ApiResponse<EmailValidationResponse>> {
    return apiService.post(API_ENDPOINTS.AUTH.VALIDATE_EMAIL || '/auth/validate-email', { email });
  }

  async loginAPI(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  async logoutAPI(): Promise<ApiResponse<null>> {
    return apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  async refreshTokenAPI(refreshToken: string): Promise<ApiResponse<{ token: string }>> {
    return apiService.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
  }

  // Mock logout API call
  async logoutUser(): Promise<ApiResponse<null>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('📤 Logout API called');
      
      return {
        success: true,
        data: null,
        message: 'Logout successful',
        status: 200
      };
      
    } catch (error: any) {
      throw {
        message: error.message || 'Logout failed',
        status: error.status || 500,
      };
    }
  }
}

export const authService = new AuthService();