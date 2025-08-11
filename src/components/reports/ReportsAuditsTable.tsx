import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';
import excelLogo from '../../assets/images/excel-logo.svg';
import imageLogo from '../../assets/images/image-logo.svg';
import filterIcon from '../../assets/icons/filter.svg';

const ReportsAuditsTable: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Sample data for reports table
  const reportsData = [
    {
      id: 'D001',
      dealerName: 'ABC Motors',
      auditorStatus: 'Completed',
      reviewerStatus: 'Reviewed',
      score: '85',
      hasReport: true
    },
    {
      id: 'D002',
      dealerName: 'XYZ Auto',
      auditorStatus: 'Yet to Start',
      reviewerStatus: 'Yet to Start',
      score: 'N/A',
      hasReport: false
    },
    {
      id: 'D003',
      dealerName: 'PQR Vehicles',
      auditorStatus: 'In Progress',
      reviewerStatus: 'In Progress',
      score: '70',
      hasReport: true
    },
    {
      id: 'D004',
      dealerName: 'LMN Automotive',
      auditorStatus: 'Completed',
      reviewerStatus: 'Approval Pending',
      score: '92',
      hasReport: true
    },
    {
      id: 'D005',
      dealerName: 'RST Motors',
      auditorStatus: 'Auto-submitted',
      reviewerStatus: 'Auto-submitted',
      score: '78',
      hasReport: true
    }
  ];

  const getStatusBadge = (status: string, type: 'auditor' | 'reviewer') => {
    let textColor, borderColor;
    
    if (type === 'auditor') {
      switch (status) {
        case 'Completed':
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
          break;
        case 'Yet to Start':
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
          break;
        default:
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
      }
    } else {
      switch (status) {
        case 'In Progress':
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
          break;
        case 'Approval Pending':
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
          break;
        case 'Auto-submitted':
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
          break;
        case 'Yet to Start':
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
          break;
        default:
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
      }
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${textColor} ${borderColor}`}>
        {status}
      </span>
    );
  };

  const filteredData = statusFilter === 'all' 
    ? reportsData 
    : reportsData.filter(item => 
        item.auditorStatus === statusFilter || item.reviewerStatus === statusFilter
      );

  const resetFilter = () => {
    setStatusFilter('all');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm w-full">
      {/* Header Section - Dashboard style filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gray-50 gap-3 sm:gap-0 relative">
        
        {/* Custom Filter Container - Same as dashboard */}
        <div className="flex items-center bg-[#F5F5F5] border border-[#D5D5D5] rounded-[5px] h-[45px] px-5 gap-3 w-auto max-w-[420px]">
          {/* Filter Icon Section - Using custom filter.svg */}
          <div className="flex items-center justify-center w-[38px] h-[45px]">
            <img src={filterIcon} alt="Filter" className="w-4 h-4" />
          </div>

          {/* Vertical Line 1 */}
          <div className="w-[1px] h-[45px] bg-[#C0C0C0] opacity-[0.69]"></div>

          {/* Filter By Section */}
          <div className="flex items-center h-[45px]">
            <span className="font-['Poppins'] font-normal text-[14px] leading-[21px] text-[#202224] whitespace-nowrap">Filter By</span>
          </div>

          {/* Vertical Line 2 */}
          <div className="w-[1px] h-[45px] bg-[#C0C0C0] opacity-[0.69]"></div>

          {/* Status Section with Dropdown */}
          <div className="flex items-center gap-2 h-[42.97px] cursor-pointer relative w-16">
            <select 
              className="font-['Poppins'] font-normal text-[14px] leading-[21px] text-[#202224] bg-transparent border-none outline-none appearance-none cursor-pointer pr-4 w-full"
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 pointer-events-none">
              <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Vertical Line 3 */}
          <div className="w-[1px] h-[42.97px] bg-[#C0C0C0] opacity-[0.69]"></div>

          {/* Reset Filter Section */}
          <button 
            onClick={resetFilter}
            className="flex items-center gap-[6px] h-[18px] cursor-pointer hover:opacity-80 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.65 2.35C12.18.88 10.21 0 8 0 5.79 0 3.82.88 2.35 2.35S0 5.79 0 8c0 1.04.2 2.04.58 2.95L2.05 9.5C1.72 8.78 1.5 7.97 1.5 8c0-1.78.69-3.45 1.94-4.69C4.69 2.06 6.36 1.37 8 1.37s3.31.69 4.56 1.94c1.25 1.24 1.94 2.91 1.94 4.69s-.69 3.45-1.94 4.69c-1.25 1.25-2.91 1.94-4.56 1.94-1.04 0-2.04-.25-2.95-.73L3.58 15.42C4.6 15.8 5.8 16 8 16c2.21 0 4.18-.88 5.65-2.35S16 10.21 16 8s-.88-4.18-2.35-5.65z" fill="#EA0234"/>
              <path d="M8 4v4l3 3" stroke="#EA0234" strokeWidth="1" fill="none"/>
            </svg>
            <span className="font-['Poppins'] font-normal text-[14px] leading-[21px] text-[#EA0234] whitespace-nowrap">Reset Filter</span>
          </button>
        </div>
        
        {/* Center - QLQD_Sales Badge - Same as dashboard */}
        <div className="w-full flex justify-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 order-2 sm:order-none">
          <div className="bg-gray-200 px-2 sm:px-4 py-1 sm:py-2 rounded-2xl text-center">
            <span className="text-gray-700 font-bold text-xs sm:text-sm">QLQD_Sales</span>
          </div>
        </div>
        
        {/* Right side actions - Same as dashboard */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end order-3 sm:order-none">
          {/* Image Export - No background, larger icon */}
          <div className="cursor-pointer hover:opacity-75 transition-opacity">
            <img src={imageLogo} alt="Image Export" className="w-7 h-7" />
          </div>
          {/* Excel Export - No background, larger icon */}
          <div className="cursor-pointer hover:opacity-75 transition-opacity">
            <img src={excelLogo} alt="Excel Export" className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Table - Responsive */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-200" style={{ backgroundColor: '#BED3FF' }}>
              <th className="text-left p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[100px]">Dealer ID</th>
              <th className="text-left p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[150px]">Dealer Name</th>
              <th className="text-center p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[120px]">Auditor Status</th>
              <th className="text-center p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[120px]">Reviewer Status</th>
              <th className="text-center p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[80px]">Score</th>
              <th className="text-center p-2 sm:p-3 lg:p-4 font-semibold text-gray-700 text-sm sm:text-base min-w-[120px]">Dealer Report</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 1 ? 'bg-[#E8E8E8]' : 'bg-white'
                }`}
              >
                <td className="p-2 sm:p-3 lg:p-4 font-medium text-gray-700 text-sm sm:text-base">{row.id}</td>
                <td className="p-2 sm:p-3 lg:p-4 text-gray-700 text-sm sm:text-base">{row.dealerName}</td>
                <td className="p-2 sm:p-3 lg:p-4 text-center">
                  {getStatusBadge(row.auditorStatus, 'auditor')}
                </td>
                <td className="p-2 sm:p-3 lg:p-4 text-center">
                  {getStatusBadge(row.reviewerStatus, 'reviewer')}
                </td>
                <td className="p-2 sm:p-3 lg:p-4 text-center text-green-600 font-medium text-sm sm:text-base">{row.score}</td>
                <td className="p-2 sm:p-3 lg:p-4 text-center">
                  {row.hasReport ? (
                    <button className="hover:opacity-75 transition-opacity">
                      <FileText 
                        size={32} 
                        className="text-red-500 mx-auto"
                      />
                    </button>
                  ) : (
                    <FileText 
                      size={32} 
                      className="text-gray-400 opacity-30 mx-auto"
                    />
                  )}
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

export default ReportsAuditsTable;