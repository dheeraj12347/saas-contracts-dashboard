// src/components/FilterBar.js
import React from 'react';
import { useContracts } from '../contexts/ContractsContext';

const FilterBar = () => {
  const { filters, setFilters } = useContracts();

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleStatusChange = (e) => {
    setFilters(prev => ({ ...prev, status: e.target.value }));
  };

  const handleRiskChange = (e) => {
    setFilters(prev => ({ ...prev, risk: e.target.value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by contract name or parties..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex space-x-4">
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={filters.status}
          onChange={handleStatusChange}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Renewal Due">Renewal Due</option>
        </select>
        
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={filters.risk}
          onChange={handleRiskChange}
        >
          <option value="All">All Risk</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
