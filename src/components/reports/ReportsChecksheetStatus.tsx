import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const ReportsChecksheetStatus: React.FC = () => {
  const { checksheetStatus } = useAppSelector((state) => state.dashboard);
  
  const LEGEND = [
    { label: 'Reviewed', value: checksheetStatus.reviewed, color: 'bg-[#0BB783]', text: 'text-white' },
    { label: 'Completed', value: checksheetStatus.completed, color: 'bg-[#FFC107]', text: 'text-[#495057]' },
    { label: 'Pending', value: checksheetStatus.pending, color: 'bg-[#E1505F]', text: 'text-white' },
    { label: 'Alloted', value: checksheetStatus.alloted, color: 'bg-[#3D8BFD]', text: 'text-white' },
  ];

  const total = checksheetStatus.reviewed + checksheetStatus.completed + checksheetStatus.pending + checksheetStatus.alloted;

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-sm mx-auto" style={{ minHeight: '200px' }}>
      <h3 className="text-gray-800 font-medium text-lg self-start mb-4">Checksheet Status</h3>
      
      {/* Status indicators - styled like the reference image */}
      <div className="flex flex-col gap-3 items-center w-full mt-4">
        {/* First row - Review Pending and Review in Progress */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="px-3 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-red-500">
              25
            </div>
            <span className="text-sm text-gray-600">Review Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 h-6 rounded-full flex items-center justify-center text-black text-sm font-bold bg-yellow-400">
              75
            </div>
            <span className="text-sm text-gray-600">Review In Progress</span>
          </div>
        </div>
        
        {/* Second row - Reviewed (centered) */}
        <div className="flex items-center justify-center gap-2">
          <div className="px-3 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-green-500">
            100
          </div>
          <span className="text-sm text-gray-600">Reviewed</span>
        </div>
      </div>
    </div>
  );
};

export default ReportsChecksheetStatus;
