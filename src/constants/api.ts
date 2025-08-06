export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    VALIDATE_EMAIL: '/auth/validate-email',
  },
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  AUDIT: {
    LIST: '/audits',
    DETAIL: (id: string) => `/audits/${id}`,
    CREATE: '/audits',
    UPDATE: (id: string) => `/audits/${id}`,
    DELETE: (id: string) => `/audits/${id}`,
  },
} as const;

export const MOCK_CREDENTIALS = {
  USERNAME: import.meta.env.VITE_MOCK_USERNAME || 'example@test.com',
  PASSWORD: import.meta.env.VITE_MOCK_PASSWORD || 'test123',
} as const;