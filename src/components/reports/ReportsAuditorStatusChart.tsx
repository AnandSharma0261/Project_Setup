import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const ReportsAuditorStatusChart: React.FC = () => {
  const { auditorStatus } = useAppSelector((state) => state.dashboard);

  const statusData = [
    { label: 'Auto Submitted', value: auditorStatus.autoSubmitted, color: 'bg-green-500' },
    { label: 'Approval in Progress', value: auditorStatus.approvalInProgress, color: 'bg-yellow-500' },
    { label: 'Approved', value: auditorStatus.approved, color: 'bg-blue-500' },
    { label: 'Approval Pending', value: auditorStatus.approvalPending, color: 'bg-red-500' }
  ];

  const total = statusData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-3 sm:p-4 lg:p-5 w-full max-w-lg mx-auto" style={{ minHeight: '200px' }}>
      <h3 className="text-gray-800 font-medium text-lg self-start mb-4">Auditor Status</h3>
      
      {/* Legend - Same layout as ChecksheetStatus */}
      <div className="flex flex-col gap-3 items-center w-full mt-4">
        {/* First row - Auto Submitted and Approval in Progress */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="px-3 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-green-500">
              {auditorStatus.autoSubmitted}
            </div>
            <span className="text-sm text-gray-600">Auto Submitted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 h-6 rounded-full flex items-center justify-center text-black text-sm font-bold bg-yellow-400">
              {auditorStatus.approvalInProgress}
            </div>
            <span className="text-sm text-gray-600">Approval in Progress</span>
          </div>
        </div>
        
        {/* Second row - Approved and Approval Pending */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="px-3 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-blue-500">
              {auditorStatus.approved}
            </div>
            <span className="text-sm text-gray-600">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-red-500">
              {auditorStatus.approvalPending}
            </div>
            <span className="text-sm text-gray-600">Approval Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAuditorStatusChart;
