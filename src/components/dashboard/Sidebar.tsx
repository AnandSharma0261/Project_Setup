import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, ChevronRight } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      path: '/reports',
    },
  ];

  return (
    <div className="w-full h-full">
      <nav className="mt-6 px-3">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 mb-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-white hover:shadow-sm hover:text-blue-600'
                }`
              }
            >
              <div className="flex items-center">
                <IconComponent className="w-5 h-5 mr-3" />
                {item.label}
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1`} />
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
