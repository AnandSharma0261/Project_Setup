import React from 'react';

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default LayoutProvider;
