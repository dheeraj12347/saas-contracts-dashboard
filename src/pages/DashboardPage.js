// src/pages/DashboardPage.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ContractsDashboard from '../components/ContractsDashboard';

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <ContractsDashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
