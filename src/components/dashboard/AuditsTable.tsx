import React, { useState } from 'react';
import { FileCheck, Filter, X } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';
import type { AuditData } from '../../types';
import excelLogo from '../../assets/images/excel-logo.svg';
import imageLogo from '../../assets/images/image-logo.svg';

const AuditsTable: React.FC = () => {
  const { auditsData } = useAppSelector((state) => state.dashboard);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadge = (status: string, type: 'auditor' | 'reviewer') => {
    let bgColor, textColor, borderColor;
    
    if (type === 'auditor') {
      switch (status) {
        case 'Completed':
          bgColor = 'bg-green-50';
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
          break;
        case 'Yet to Start':
          bgColor = 'bg-orange-50';
          textColor = 'text-orange-600';
          borderColor = 'border-orange-200';
          break;
        default:
          bgColor = 'bg-gray-50';
          textColor = 'text-gray-600';
          borderColor = 'border-gray-200';
      }
    } else {
      switch (status) {
        case 'In Progress':
          bgColor = 'bg-orange-50';
          textColor = 'text-orange-600';
          borderColor = 'border-orange-200';
          break;
        case 'Approval Pending':
          bgColor = 'bg-red-50';
          textColor = 'text-red-600';
          borderColor = 'border-red-200';
          break;
        case 'Auto-submitted':
          bgColor = 'bg-blue-50';
          textColor = 'text-blue-600';
          borderColor = 'border-blue-200';
          break;
        case 'Yet to Start':
          bgColor = 'bg-orange-50';
          textColor = 'text-orange-600';
          borderColor = 'border-orange-200';
          break;
        default:
          bgColor = 'bg-gray-50';
          textColor = 'text-gray-600';
          borderColor = 'border-gray-200';
      }
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${bgColor} ${textColor} ${borderColor}`}>
        {status}
      </span>
    );
  };

  const filteredData = statusFilter === 'all' 
    ? auditsData 
    : auditsData.filter(item => 
        item.auditorStatus === statusFilter || item.reviewerStatus === statusFilter
      );

  const resetFilter = () => {
    setStatusFilter('all');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm w-full mx-auto">
      {/* Header Section - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gray-50 gap-3 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Filter Icon */}
          <div className="w-6 h-6 flex items-center justify-center">
            <Filter className="w-4 h-4 text-blue-600" />
          </div>
          
          {/* Filter By Status */}
          <span className="text-gray-700 text-sm font-medium whitespace-nowrap">Filter By Status</span>
          
          {/* Status Dropdown - Smaller size */}
          <select 
            className="border border-gray-300 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-16"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Yet to Start">Yet to Start</option>
            <option value="In Progress">In Progress</option>
            <option value="Approval Pending">Approval Pending</option>
            <option value="Auto-submitted">Auto-submitted</option>
          </select>
          
          {/* Reset Filter - Image style */}
          <button 
            onClick={resetFilter}
            className="flex items-center gap-1 text-red-500 text-xs font-medium hover:text-red-600 transition-colors px-2 py-1 border border-red-300 rounded bg-red-50"
          >
            <span>🔄 Reset Filter</span>
          </button>
        </div>
        
        {/* Center - QLQD_Sales Badge - Hidden on mobile */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
          <div className="bg-gray-200 px-4 py-2 rounded-md text-center">
            <span className="text-gray-700 font-medium text-sm">QLQD_Sales</span>
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          {/* Image Export */}
          <div className="bg-blue-100 p-2 rounded-md cursor-pointer hover:bg-blue-200 transition-colors">
            <img src={imageLogo} alt="Image Export" className="w-5 h-5" />
          </div>
          {/* Excel Export */}
          <div className="bg-green-100 p-2 rounded-md cursor-pointer hover:bg-green-200 transition-colors">
            <img src={excelLogo} alt="Excel Export" className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table - Responsive */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-blue-50 border-b border-gray-200">
              <th className="text-left p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[100px]">Dealer Code</th>
              <th className="text-left p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[150px]">Dealer Name</th>
              <th className="text-center p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[120px]">Auditor Status</th>
              <th className="text-center p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[120px]">Reviewer Status</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 1 ? 'bg-gray-25' : 'bg-white'
                }`}
              >
                <td className="p-2 sm:p-3 lg:p-4 font-medium text-gray-700 text-sm sm:text-base">{row.dealerCode}</td>
                <td className="p-2 sm:p-3 lg:p-4 text-gray-700 text-sm sm:text-base">{row.dealerName}</td>
                <td className="p-2 sm:p-3 lg:p-4 text-center">
                  {getStatusBadge(row.auditorStatus, 'auditor')}
                </td>
                <td className="p-2 sm:p-3 lg:p-4 text-center">
                  {getStatusBadge(row.reviewerStatus, 'reviewer')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="relative p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2023 TVS Motor Company. All Rights Reserved
          </p>
        </div>
        
        <div className="absolute bottom-4 right-6 text-xs text-gray-500">
          <span className="cursor-pointer hover:underline hover:text-gray-700 transition-colors">Privacy Policy</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:underline hover:text-gray-700 transition-colors">Terms & Conditions</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:underline hover:text-gray-700 transition-colors">Warranty T&C</span>
        </div>
      </div>
    </div>
  );
};

export default AuditsTable;
