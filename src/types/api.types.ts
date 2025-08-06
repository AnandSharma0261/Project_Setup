// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}