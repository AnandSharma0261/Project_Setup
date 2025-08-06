import React from 'react';

interface LandingHeaderProps {
  showHeader?: boolean;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ showHeader = true }) => {
  if (!showHeader) return null;
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-xl font-bold text-gray-800">TVS CMS Portal</h1>
      </div>
    </header>
  );
};

export default LandingHeader;
