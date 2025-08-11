import React from 'react';
import { setFilters } from '../store/slices/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import MetricCard from '../components/dashboard/MetricCard.tsx';
import Layout from '../components/dashboard/Layout.tsx';
import ReportsAuditsTable from '../components/reports/ReportsAuditsTable.tsx';
import metric1Icon from '../assets/icons/metric1.svg';
import metric2Icon from '../assets/icons/metric2.svg';
import metric3Icon from '../assets/icons/metric3.svg';
import metric4Icon from '../assets/icons/metric4.svg';

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
          {/* Left side - Status sections with new styling */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Auditor Status Card */}
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-center">Auditor Status</h3>
                <div className="bg-white rounded-lg shadow-md p-3 h-28">
                  <div className="flex flex-col h-full">
                    {/* First two items in top row */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="bg-red-500 text-white rounded-md w-7 h-5 flex items-center justify-center text-xs font-bold mr-2">
                          25
                        </div>
                        <div className="text-gray-700 text-xs font-medium leading-tight">
                          Audit Not Started
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-orange-400 text-white rounded-md w-7 h-5 flex items-center justify-center text-xs font-bold mr-2">
                          23
                        </div>
                        <div className="text-gray-700 text-xs font-medium leading-tight">
                          Audit In Progress
                        </div>
                      </div>
                    </div>
                    
                    {/* Third item centered at bottom */}
                    <div className="flex justify-center items-end flex-1">
                      <div className="flex items-center">
                        <div className="bg-green-500 text-white rounded-md w-7 h-5 flex items-center justify-center text-xs font-bold mr-2">
                          100
                        </div>
                        <div className="text-gray-700 text-xs font-medium leading-tight">
                          Audit Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviewer Status Card */}
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-center">Reviewer Status</h3>
                <div className="bg-white rounded-lg shadow-md p-3 h-28">
                  <div className="flex flex-col h-full">
                    {/* First two items in top row */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="bg-red-500 text-white rounded-md w-7 h-5 flex items-center justify-center text-xs font-bold mr-2">
                          75
                        </div>
                        <div className="text-gray-700 text-xs font-medium leading-tight">
                          Review Pending
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-orange-400 text-white rounded-md w-7 h-5 flex items-center justify-center text-xs font-bold mr-2">
                          23
                        </div>
                        <div className="text-gray-700 text-xs font-medium leading-tight">
                          Review In Progress
                        </div>
                      </div>
                    </div>
                    
                    {/* Third item centered at bottom */}
                    <div className="flex justify-center items-end flex-1">
                      <div className="flex items-center">
                        <div className="bg-green-500 text-white rounded-md w-7 h-5 flex items-center justify-center text-xs font-bold mr-2">
                          100
                        </div>
                        <div className="text-gray-700 text-xs font-medium leading-tight">
                          Reviewed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto Submission Status Card */}
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-center">Auto Submission Status</h3>
                <div className="bg-white rounded-lg shadow-md p-3 h-28">
                  <div className="flex flex-col h-full">
                    {/* First two items in top row */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="bg-red-500 text-white rounded-md w-7 h-5 flex items-center justify-center text-xs font-bold mr-2">
                          25
                        </div>
                        <div className="text-gray-700 text-xs font-medium leading-tight">
                          Audit Not Started
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-orange-400 text-white rounded-md w-7 h-5 flex items-center justify-center text-xs font-bold mr-2">
                          75
                        </div>
                        <div className="text-gray-700 text-xs font-medium leading-tight">
                          Audit Not Reviewed
                        </div>
                      </div>
                    </div>
                    
                    {/* Third item centered at bottom */}
                    <div className="flex justify-center items-end flex-1">
                      <div className="flex items-center">
                        <div className="bg-green-500 text-white rounded-md w-7 h-5 flex items-center justify-center text-xs font-bold mr-2">
                          100
                        </div>
                        <div className="text-gray-700 text-xs font-medium leading-tight">
                          Total Autosubmitted
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Metric cards with icons - Reduced height */}
          <div className="flex-shrink-0 w-full lg:w-64 xl:w-72">
            <div className="grid grid-cols-2 gap-2 h-[140px]">
              <div className="w-full h-16">
                <MetricCard
                  title="Total Dealers"
                  value={200}
                  iconSrc={metric1Icon}
                  bgColor="bg-pink-400"
                  textColor="text-white"
                  className="!min-h-0 h-full !p-2 !text-xs [&>div>div:first-child>img]:!w-4 [&>div>div:first-child>img]:!h-4 [&>div>div:first-child]:!mr-2 [&>div>div:last-child>p:first-child]:!text-sm [&>div>div:last-child>p:first-child]:!mb-0 [&>div>div:last-child>p:last-child]:!text-xs [&>div>div:last-child>p:last-child]:!leading-3"
                />
              </div>
              <div className="w-full h-16">
                <MetricCard
                  title="Audit Not started"
                  value={25}
                  iconSrc={metric2Icon}
                  bgColor="bg-red-500"
                  textColor="text-white"
                  className="!min-h-0 h-full !p-2 !text-xs [&>div>div:first-child>img]:!w-4 [&>div>div:first-child>img]:!h-4 [&>div>div:first-child]:!mr-2 [&>div>div:last-child>p:first-child]:!text-sm [&>div>div:last-child>p:first-child]:!mb-0 [&>div>div:last-child>p:last-child]:!text-xs [&>div>div:last-child>p:last-child]:!leading-3"
                />
              </div>
              <div className="w-full h-16">
                <MetricCard
                  title="Audit Not Reviewed"
                  value={75}
                  iconSrc={metric3Icon}
                  bgColor="bg-yellow-400"
                  textColor="text-white"
                  className="!min-h-0 h-full !p-2 !text-xs [&>div>div:first-child>img]:!w-4 [&>div>div:first-child>img]:!h-4 [&>div>div:first-child]:!mr-2 [&>div>div:last-child>p:first-child]:!text-sm [&>div>div:last-child>p:first-child]:!mb-0 [&>div>div:last-child>p:last-child]:!text-xs [&>div>div:last-child>p:last-child]:!leading-3"
                />
              </div>
              <div className="w-full h-16">
                <MetricCard
                  title="Audit Completed"
                  value={100}
                  iconSrc={metric4Icon}
                  bgColor="bg-blue-500"
                  textColor="text-white"
                  className="!min-h-0 h-full !p-2 !text-xs [&>div>div:first-child>img]:!w-4 [&>div>div:first-child>img]:!h-4 [&>div>div:first-child]:!mr-2 [&>div>div:last-child>p:first-child]:!text-sm [&>div>div:last-child>p:first-child]:!mb-0 [&>div>div:last-child>p:last-child]:!text-xs [&>div>div:last-child>p:last-child]:!leading-3"
                />
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
