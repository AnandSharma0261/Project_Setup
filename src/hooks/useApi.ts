import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { apiService } from '../services/api';
import { API_ENDPOINTS, MOCK_CREDENTIALS } from '../constants/api';
import type { LoginRequest, LoginResponse } from '../types/auth';
import type { ApiError, ApiResponse } from '../types/api.types';
import { login as loginAction, logout as logoutAction } from '../store/slices/authSlice';

interface UseApiCallState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export function useApiCall<T = any>() {
  const [state, setState] = useState<UseApiCallState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const apiError = error as ApiError;
      setState(prev => ({ ...prev, loading: false, error: apiError }));
      throw apiError;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

export function useLogin() {
  const dispatch = useDispatch();
  const { execute, loading, error } = useApiCall<ApiResponse<LoginResponse>>();

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      const result = await execute(async () => {
        if (
          credentials.email === MOCK_CREDENTIALS.USERNAME &&
          credentials.password === MOCK_CREDENTIALS.PASSWORD
        ) {
          const mockResponse: LoginResponse = {
            user: {
              id: '1',
              email: credentials.email,
              name: 'Test User',
              role: 'admin',
              avatar: '',
              permissions: ['read', 'write', 'delete'],
            },
            token: 'mock-jwt-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
            expiresIn: 3600,
          };

          return {
            success: true,
            data: mockResponse,
            message: 'Login successful',
            status: 200,
          };
        } else {
          throw {
            message: 'Invalid credentials',
            status: 401,
          } as ApiError;
        }
      });

      if (result.success) {
        const { user, token, refreshToken } = result.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch(loginAction({ user, token, refreshToken }));
      }

      return result;
    } catch (error) {
      throw error;
    }
  }, [execute, dispatch]);

  const logout = useCallback(async () => {
    try {
      // Call logout API if needed (for server-side logout)
      // await authService.logoutUser();
      
      console.log('🔓 Clearing user session...');
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Update Redux state
      dispatch(logoutAction());
      
      console.log('✅ User session cleared successfully');
      
      return {
        success: true,
        data: null,
        message: 'Logged out successfully',
        status: 200,
      };
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Even if API fails, clear local state for security
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      dispatch(logoutAction());
      throw error;
    }
  }, [dispatch]);

  return {
    login,
    logout,
    loading,
    error,
  };
}

export function useApi() {
  const get = useCallback(async <T>(url: string) => {
    return apiService.get<T>(url);
  }, []);

  const post = useCallback(async <T>(url: string, data?: any) => {
    return apiService.post<T>(url, data);
  }, []);

  const put = useCallback(async <T>(url: string, data?: any) => {
    return apiService.put<T>(url, data);
  }, []);

  const patch = useCallback(async <T>(url: string, data?: any) => {
    return apiService.patch<T>(url, data);
  }, []);

  const del = useCallback(async <T>(url: string) => {
    return apiService.delete<T>(url);
  }, []);

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    endpoints: API_ENDPOINTS,
  };
}