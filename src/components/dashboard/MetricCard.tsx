import React from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  iconSrc: string;
  bgColor: string;
  textColor: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  iconSrc, 
  bgColor, 
  textColor, 
  className = "" 
}) => {
  return (
    <div className={`${bgColor} ${textColor} p-3 sm:p-4 rounded-lg shadow-sm ${className}`} style={{ minHeight: '90px' }}>
      <div className="flex items-center justify-start h-full">
        <div className="opacity-80 mr-3 sm:mr-4">
          <img src={iconSrc} alt="" className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">{value}</p>
          <p className="text-xs sm:text-sm opacity-90 leading-tight">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
