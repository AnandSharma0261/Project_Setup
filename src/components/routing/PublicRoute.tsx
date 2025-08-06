import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean; // For auth-only routes like login pages
}

const PublicRoute: React.FC<PublicRouteProps> = ({ 
  children, 
  redirectIfAuthenticated = false 
}) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, token } = useSelector((state: RootState) => state.auth);

  // Show loading while authentication state is being determined
  if (isLoading) {
    return (
      <div className="auth-loading-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div className="loading-spinner" style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #0066cc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: '#666', fontSize: '16px' }}>Loading...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  const isUserAuthenticated = isAuthenticated && token;

  // For auth-only routes (login pages), redirect authenticated users to dashboard
  if (redirectIfAuthenticated && isUserAuthenticated) {
    // Check if there's a redirect destination from protected route attempt
    const state = location.state as { from?: string } | null;
    const redirectTo = state?.from || '/dashboard';
    
    console.log('🔄 Authenticated user accessing auth page, redirecting to:', redirectTo);
    
    return <Navigate to={redirectTo} replace />;
  }

  // For regular public routes, always allow access
  console.log('🌐 Accessing public route:', location.pathname);
  return <>{children}</>;
};

export default PublicRoute;