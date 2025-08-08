
import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const ChecksheetStatus: React.FC = () => {
  const { checksheetStatus } = useAppSelector((state) => state.dashboard);
  
  // We'll use these values directly in our updated UI
  // For the image in your reference, we need 3 values: "Review Pending", "Review In Progress" and "Reviewed"

  const total = checksheetStatus.reviewed + checksheetStatus.completed + checksheetStatus.pending + checksheetStatus.alloted;

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-3 sm:p-4 lg:p-5 w-full max-w-lg mx-auto" style={{ minHeight: '440px' }}>
      <h3 className="text-gray-800 font-medium text-lg self-start mb-4">Checksheet Status</h3>
      {/* Chart Rings - Responsive size */}
      <div className="relative flex-none mx-auto w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
        {/* Outer Ring (Green) */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-full border-[16px] sm:border-[18px] lg:border-[20px] border-[#F6F6F6]" />
          <div className="absolute inset-0 rounded-full border-[16px] sm:border-[18px] lg:border-[20px] border-transparent border-t-[#0BB783] border-r-[#0BB783]" style={{ transform: 'rotate(-90deg)' }} />
        </div>
        {/* Middle Ring (Yellow) */}
        <div className="absolute inset-6 sm:inset-8 lg:inset-10">
          <div className="absolute inset-0 rounded-full border-[12px] sm:border-[14px] lg:border-[16px] border-[#F6F6F6]" />
          <div className="absolute inset-0 rounded-full border-[12px] sm:border-[14px] lg:border-[16px] border-transparent border-t-[#FFC107]" style={{ transform: 'rotate(-90deg)' }} />
        </div>
        {/* Inner Ring (Red) */}
        <div className="absolute inset-12 sm:inset-14 lg:inset-16">
          <div className="absolute inset-0 rounded-full border-[10px] sm:border-[11px] lg:border-[12px] border-[#F6F6F6]" />
          <div className="absolute inset-0 rounded-full border-[10px] sm:border-[11px] lg:border-[12px] border-transparent border-t-[#E1505F]" style={{ transform: 'rotate(-90deg)' }} />
        </div>
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

export default ChecksheetStatus;
