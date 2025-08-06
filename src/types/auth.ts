export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// API types are now in src/types/api.types.ts
export type { ApiResponse, ApiError } from './api.types';