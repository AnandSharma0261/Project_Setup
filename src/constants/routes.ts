import type { RouteConfig } from '../types'
import { LayoutType } from '../types'

// Dynamic Route Configuration
// Add new routes here - they will be automatically included in the application
export const ROUTE_CONFIGS: RouteConfig[] = [
  // Landing/Home Page
  {
    path: '/',
    component: 'Home',
    layout: LayoutType.FULL_PAGE,
    title: 'TVS CMS Portal - Home',
    description: 'Welcome to the TVS CMS Portal',
    exact: true,
    showInNav: false
  },

  // Authentication Routes
  {
    path: '/ad-login',
    component: 'ADLogin',
    layout: LayoutType.FULL_PAGE,
    title: 'TVS Login - Active Directory',
    description: 'Login with your TVS Active Directory credentials',
    showInNav: false
  },
  {
    path: '/ad-password',
    component: 'ADPasswordEntry',
    layout: LayoutType.FULL_PAGE,
    title: 'Enter Password',
    description: 'Enter your password to complete login',
    showInNav: false
  },
  {
    path: '/email-login',
    component: 'EmailLogin',
    layout: LayoutType.FULL_PAGE,
    title: 'Email Login - OTP Verification',
    description: 'Login with your registered email address',
    showInNav: false
  },

  // Dashboard Routes
  {
    path: '/dashboard',
    component: 'Dashboard',
    layout: LayoutType.DASHBOARD,
    title: 'Dashboard - TVS CMS Portal',
    description: 'Main dashboard with audit statistics and data',
    protected: true,
    showInNav: false
  },
  
  // Reports Routes
  {
    path: '/reports',
    component: 'Reports',
    layout: LayoutType.DASHBOARD,
    title: 'Reports - TVS CMS Portal',
    description: 'Audit reports and analytics data',
    protected: true,
    showInNav: false
  },
]

// Route Utilities
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return ROUTE_CONFIGS.find(route => route.path === path)
}

export const getNavigationRoutes = (): RouteConfig[] => {
  return ROUTE_CONFIGS
    .filter(route => route.showInNav)
    .sort((a, b) => (a.order || 999) - (b.order || 999))
}

export const getFullPageRoutes = (): string[] => {
  return ROUTE_CONFIGS
    .filter(route => route.layout === LayoutType.FULL_PAGE)
    .map(route => route.path)
}

export const getProtectedRoutes = (): string[] => {
  return ROUTE_CONFIGS
    .filter(route => route.protected)
    .map(route => route.path)
}

// Route Validation
export const isValidRoute = (path: string): boolean => {
  return ROUTE_CONFIGS.some(route => route.path === path)
}

export const getRouteTitle = (path: string): string => {
  const route = getRouteByPath(path)
  return route?.title || 'TVS CMS Portal'
}

export const getRouteDescription = (path: string): string => {
  const route = getRouteByPath(path)
  return route?.description || 'TVS Content Management System Portal'
}