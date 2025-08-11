import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const AutoSubmissionStatus: React.FC = () => {
  const { autoSubmissionStatus } = useAppSelector((state) => state.dashboard);
  
  // We'll use these values directly in our updated UI
  // For the Auto Submission Status, we need 3 values: "Review Pending", "Review In Progress" and "Reviewed"

  const total = autoSubmissionStatus.reviewed + autoSubmissionStatus.completed + autoSubmissionStatus.pending + autoSubmissionStatus.alloted;

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-3 sm:p-4 lg:p-5 w-full max-w-lg mx-auto" style={{ minHeight: '440px' }}>
      
      {/* Chart Rings - SVG Implementation with Even Spacing */}
      <div className="relative flex-none mx-auto w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
        <svg width="100%" height="100%" viewBox="0 0 256 256" className="transform -rotate-90">
          {/* Background rings */}
          <circle cx="128" cy="128" r="112" fill="none" stroke="#F6F6F6" strokeWidth="20" />
          <circle cx="128" cy="128" r="84" fill="none" stroke="#F6F6F6" strokeWidth="16" />
          <circle cx="128" cy="128" r="60" fill="none" stroke="#F6F6F6" strokeWidth="12" />
          
          {/* Colored rings with rounded caps and even spacing */}
          {/* Outer Ring (Green) - 50% */}
          <circle 
            cx="128" 
            cy="128" 
            r="112" 
            fill="none" 
            stroke="#0BB783" 
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="351.86 351.86"
            strokeDashoffset="175.93"
            className="opacity-100"
          />
          
          {/* Middle Ring (Yellow) - 30% */}
          <circle 
            cx="128" 
            cy="128" 
            r="84" 
            fill="none" 
            stroke="#FFC107" 
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="157.08 367.53"
            strokeDashoffset="78.54"
            className="opacity-100"
          />
          
          {/* Inner Ring (Red) - 20% */}
          <circle 
            cx="128" 
            cy="128" 
            r="60" 
            fill="none" 
            stroke="#E1505F" 
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="75.4 301.59"
            strokeDashoffset="37.7"
            className="opacity-100"
          />
        </svg>
        
        {/* Center Text - Responsive */}
        <div className="absolute flex flex-col items-center justify-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-gray-500 text-sm sm:text-base lg:text-lg">Total</div>
          <div className="text-blue-500 text-xl sm:text-2xl font-bold">{total}</div>
        </div>
      </div>
      {/* Legend - Styled like ReviewerStatusCard */}
      <div className="flex flex-col gap-3 items-center w-full mt-4">
        {/* First row - Review Pending and Review in Progress */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div 
              className="px-3 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-red-500"
            >
              25
            </div>
            <span className="text-sm text-gray-600">Review Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="px-3 h-6 rounded-full flex items-center justify-center text-black text-sm font-bold bg-yellow-400"
            >
              75
            </div>
            <span className="text-sm text-gray-600">Review In Progress</span>
          </div>
        </div>
        
        {/* Second row - Reviewed (centered) */}
        <div className="flex items-center justify-center gap-2">
          <div 
            className="px-3 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-green-500"
          >
            100
          </div>
          <span className="text-sm text-gray-600">Reviewed</span>
        </div>
      </div>
    </div>
  );
};

export default AutoSubmissionStatus;
