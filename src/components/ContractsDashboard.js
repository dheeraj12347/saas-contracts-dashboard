// src/components/ContractsDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContracts } from '../contexts/ContractsContext';
import FilterBar from './FilterBar';
import Pagination from './Pagination';

const ContractsDashboard = () => {
  const navigate = useNavigate();
  const { loading, error, getFilteredContracts } = useContracts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const filteredContracts = getFilteredContracts();
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContracts = filteredContracts.slice(startIndex, startIndex + itemsPerPage);

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Renewal Due': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-medium">Error loading contracts</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterBar />
      
      {filteredContracts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts yet</h3>
          <p className="text-gray-500">Upload your first contract to get started.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Score
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedContracts.map((contract) => (
                  <tr 
                    key={contract.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/contract/${contract.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{contract.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.parties}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.expiry}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskBadgeColor(contract.risk)}`}>
                        {contract.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ContractsDashboard;
