import React from 'react';
import { Users, Eye, UserCheck, Building, FileCheck } from 'lucide-react';
import { setFilters } from '../store/slices/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import MetricCard from '../components/dashboard/MetricCard.tsx';
import Layout from '../components/dashboard/Layout.tsx';
import ReportsAuditsTable from '../components/reports/ReportsAuditsTable.tsx';

const Reports: React.FC = () => {
  const dispatch = useAppDispatch();
  const { metrics, filters } = useAppSelector((state) => state.dashboard);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  return (
    <Layout>
      <div className="pt-2 px-2 sm:px-4 lg:px-6">
        {/* Header - Responsive */}
        <div className="mb-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex-shrink-0">Reports</h1>
            {/* Filters row - Responsive */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:flex-1 overflow-x-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
                <span className="font-medium text-gray-700 whitespace-nowrap text-sm">Department</span>
                <select 
                  className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-500 shadow-sm focus:outline-none w-full sm:w-32 lg:w-44"
                  value={filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="sales">Sales</option>
                  <option value="service">Service</option>
                </select>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
                <span className="font-medium text-gray-700 whitespace-nowrap text-sm">Region</span>
                <select 
                  className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-500 shadow-sm focus:outline-none w-full sm:w-32 lg:w-44"
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                >
                  <option value="">Select Region</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                </select>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
                <span className="font-medium text-gray-700 whitespace-nowrap text-sm">Country</span>
                <select 
                  className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-500 shadow-sm focus:outline-none w-full sm:w-32 lg:w-44"
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                >
                  <option value="">Select Country</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reports Audit Status Section - Responsive */}
        <div className="bg-blue-100 rounded-lg p-3 sm:p-4 lg:p-6 border border-blue-200 mt-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Reports Audit Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Select Audit */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Audit</option>
                <option value="audit1">Audit 1</option>
                <option value="audit2">Audit 2</option>
                <option value="audit3">Audit 3</option>
              </select>
            </div>

            {/* Select Audit Month */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Audit Month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>

            {/* Select Zone */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Zone</option>
                <option value="north">North Zone</option>
                <option value="south">South Zone</option>
                <option value="east">East Zone</option>
                <option value="west">West Zone</option>
                <option value="central">Central Zone</option>
              </select>
            </div>

            {/* Select Area */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Area</option>
                <option value="area1">Area 1</option>
                <option value="area2">Area 2</option>
                <option value="area3">Area 3</option>
                <option value="area4">Area 4</option>
              </select>
            </div>

            {/* Select Territory */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Territory</option>
                <option value="territory1">Territory 1</option>
                <option value="territory2">Territory 2</option>
                <option value="territory3">Territory 3</option>
                <option value="territory4">Territory 4</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Status sections and metric cards in same row */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Left side - Status sections */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Auditor Status */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Auditor Status</h3>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-red-500 flex items-center justify-center text-white text-xl font-bold mr-4">25</div>
                    <span className="text-base text-gray-800">Audit Not Started</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-yellow-500 flex items-center justify-center text-white text-xl font-bold mr-4">25</div>
                    <span className="text-base text-gray-800">Audit In Progress</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-green-500 flex items-center justify-center text-white text-xl font-bold mr-4">100</div>
                    <span className="text-base text-gray-800">Audit Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviewer Status */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Reviewer Status</h3>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-red-500 flex items-center justify-center text-white text-xl font-bold mr-4">75</div>
                    <span className="text-base text-gray-800">Review Pending</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-yellow-500 flex items-center justify-center text-white text-xl font-bold mr-4">75</div>
                    <span className="text-base text-gray-800">Review In Progress</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-green-500 flex items-center justify-center text-white text-xl font-bold mr-4">100</div>
                    <span className="text-base text-gray-800">Reviewed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto Submission Status */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Auto Submission Status</h3>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-red-500 flex items-center justify-center text-white text-xl font-bold mr-4">25</div>
                    <span className="text-base text-gray-800">Audit Not Started</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-yellow-500 flex items-center justify-center text-white text-xl font-bold mr-4">75</div>
                    <span className="text-base text-gray-800">Audit Not Reviewed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-green-500 flex items-center justify-center text-white text-xl font-bold mr-4">100</div>
                    <span className="text-base text-gray-800">Total Autosubmitted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Metric cards with icons on left */}
          <div className="flex-shrink-0 w-full lg:w-80 xl:w-[500px]">
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full">
                <div className="bg-pink-400 text-white rounded-lg p-4 shadow flex items-center justify-between">
                  <Building className="w-6 h-6 ml-2 opacity-75" />
                  <div className="flex flex-col items-end">
                    <div className="text-3xl font-bold">200</div>
                    <div className="text-sm mt-1">Total Dealers</div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="bg-red-500 text-white rounded-lg p-4 shadow flex items-center justify-between">
                  <UserCheck className="w-6 h-6 ml-2 opacity-75" />
                  <div className="flex flex-col items-end">
                    <div className="text-3xl font-bold">25</div>
                    <div className="text-sm mt-1">Audit Not started</div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="bg-yellow-400 text-white rounded-lg p-4 shadow flex items-center justify-between">
                  <Eye className="w-6 h-6 ml-2 opacity-75" />
                  <div className="flex flex-col items-end">
                    <div className="text-3xl font-bold">75</div>
                    <div className="text-sm mt-1">Audit Not Reviewed</div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="bg-blue-500 text-white rounded-lg p-4 shadow flex items-center justify-between">
                  <FileCheck className="w-6 h-6 ml-2 opacity-75" />
                  <div className="flex flex-col items-end">
                    <div className="text-3xl font-bold">100</div>
                    <div className="text-sm mt-1">Audit Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Audits table below both, compact spacing */}
        <div className="mt-6">
          <ReportsAuditsTable />
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
