
import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const ChecksheetStatus: React.FC = () => {
  const { checksheetStatus } = useAppSelector((state) => state.dashboard);
  
  const LEGEND = [
    { label: 'Reviewed', value: checksheetStatus.reviewed, color: 'bg-[#0BB783]', text: 'text-white' },
    { label: 'Completed', value: checksheetStatus.completed, color: 'bg-[#FFC107]', text: 'text-[#495057]' },
    { label: 'Pending', value: checksheetStatus.pending, color: 'bg-[#E1505F]', text: 'text-white' },
    { label: 'Alloted', value: checksheetStatus.alloted, color: 'bg-[#3D8BFD]', text: 'text-white' },
  ];

  const total = checksheetStatus.reviewed + checksheetStatus.completed + checksheetStatus.pending + checksheetStatus.alloted;

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-3 sm:p-4 lg:p-5 w-full max-w-sm mx-auto" style={{ minHeight: '400px' }}>
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
      {/* Legend - Responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full mt-3 sm:mt-4">
        {LEGEND.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center ${item.color} text-xs sm:text-sm font-bold ${item.text}`}>
              {item.value}
            </div>
            <span className="text-xs sm:text-sm text-gray-600 leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecksheetStatus;
