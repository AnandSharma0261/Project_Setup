import React from 'react';

interface LandingFooterProps {
  showFooter?: boolean;
}

const LandingFooter: React.FC<LandingFooterProps> = ({ showFooter = true }) => {
  if (!showFooter) return null;
  
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-3">
        <p className="text-center text-gray-600 text-sm">
          © 2024 TVS CMS Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
