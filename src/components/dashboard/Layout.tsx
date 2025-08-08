import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { toggleSidebar } from '../../store/slices/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Sidebar from './Sidebar.tsx';
import logo from '../../assets/images/header-logo.svg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { sidebarOpen } = useAppSelector((state) => state.dashboard);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSidebarToggle = () => {
    console.log('Sidebar toggle clicked, current state:', sidebarOpen);
    dispatch(toggleSidebar());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full width across top */}
      <header className="bg-blue-600 text-white px-4 lg:px-6 py-3 flex items-center justify-between flex-shrink-0 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-12 flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* TVS Logo - Always visible with click functionality */}
            <div 
              className="flex items-center justify-center cursor-pointer hover:bg-blue-700 rounded-lg p-1 transition-colors"
              onClick={handleSidebarToggle}
              title="Toggle Sidebar"
            >
              <img src={logo} alt="TVS Logo" className="w-12 h-12 object-contain" />
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="bg-white text-gray-900 pl-10 pr-4 py-1.5 rounded-[19px] w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{ height: '38px' }}
            />
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="relative">
            <Bell className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer" onClick={handleLogout}>
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-sm hidden sm:block">
              <div className="font-medium">{user?.name || 'Test User'}</div>
              <div className="text-blue-200 text-xs">{user?.role || 'admin'}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Content area below header */}
      <div className="flex pt-16"> {/* Added padding-top to accommodate fixed header */}
        {/* Sidebar - Responsive behavior */}
        {sidebarOpen && (
          <div className="w-64 transition-all duration-300 ease-in-out bg-gray-50 shadow-lg border-r border-gray-200 fixed lg:relative z-30 lg:z-auto top-0 bottom-0 left-0">
            {/* Invisible header space to push content down */}
            <div className="h-16 bg-gray-50"></div>
            <div className="absolute top-16 bottom-0 left-0 right-0 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        )}
        
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={handleSidebarToggle}
          />
        )}

        {/* Main content - Expands when sidebar is closed */}
        <main className={`flex-1 p-4 lg:p-6 overflow-y-auto min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-0' : 'ml-0'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
