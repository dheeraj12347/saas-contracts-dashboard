// src/components/Sidebar.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Contracts', path: '/dashboard', icon: '📄' },
    { name: 'Insights', path: '/insights', icon: '🔍' },
    { name: 'Reports', path: '/reports', icon: '📊' },
    { name: 'Settings', path: '/settings', icon: '⚙️' }
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">ContractIQ</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
              location.pathname === item.path ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : ''
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
