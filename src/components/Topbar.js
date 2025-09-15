// src/components/Topbar.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UploadModal from './UploadModal';

const Topbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Contracts Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Upload Contract
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </div>
                <span className="font-medium">{user?.username}</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </>
  );
};

export default Topbar;
