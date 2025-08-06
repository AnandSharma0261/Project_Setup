import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Loading component for authentication check
const AuthLoadingSpinner = () => (
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
    <p style={{ color: '#666', fontSize: '16px' }}>Checking authentication...</p>
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

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, token } = useSelector((state: RootState) => state.auth);

  // Show loading spinner while authentication state is being determined
  if (isLoading) {
    return <AuthLoadingSpinner />;
  }

  // Check if user is authenticated (has valid token and isAuthenticated flag)
  const isUserAuthenticated = isAuthenticated && token;

  if (!isUserAuthenticated) {
    // Store the attempted location for redirect after login
    const redirectPath = location.pathname + location.search;
    
    console.log('🔒 Access denied to protected route:', redirectPath);
    console.log('🔄 Redirecting to login page...');
    
    // Redirect to login page with the original destination stored in state
    return (
      <Navigate 
        to="/ad-login" 
        state={{ 
          from: redirectPath,
          message: 'Please sign in to access this page.' 
        }} 
        replace 
      />
    );
  }

  // User is authenticated, render the protected component
  console.log('✅ Access granted to protected route:', location.pathname);
  return <>{children}</>;
};

export default ProtectedRoute;