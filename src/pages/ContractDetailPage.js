// src/pages/ContractDetailPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContracts } from '../contexts/ContractsContext';
import ClauseCard from '../components/ClauseCard';
import InsightList from '../components/InsightList';
import EvidencePanel from '../components/EvidencePanel';

const ContractDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getContractById } = useContracts();
  const [showEvidence, setShowEvidence] = useState(false);
  
  const contract = getContractById(id);

  if (!contract) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Contract not found</h3>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-primary-600 hover:text-primary-800"
        >
          Return to dashboard
        </button>
      </div>
    );
  }

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-primary-600 hover:text-primary-800 mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{contract.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{contract.parties}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Start Date:</span>
                  <p className="font-medium">{contract.start}</p>
                </div>
                <div>
                  <span className="text-gray-500">Expiry Date:</span>
                  <p className="font-medium">{contract.expiry}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className={`inline-flex mt-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(contract.status)}`}>
                    {contract.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Risk Score:</span>
                  <span className={`inline-flex mt-1 px-2 py-1 text-xs font-semibold rounded-full ${getRiskBadgeColor(contract.risk)}`}>
                    {contract.risk}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEvidence(!showEvidence)}
                className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
              >
                View Evidence
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contract Clauses</h2>
            <div className="space-y-4">
              {contract.clauses?.map((clause, index) => (
                <ClauseCard key={index} clause={clause} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Insights</h2>
            <InsightList insights={contract.insights || []} />
          </div>
        </div>
      </div>
      
      {showEvidence && (
        <EvidencePanel 
          evidence={contract.evidence || []} 
          onClose={() => setShowEvidence(false)} 
        />
      )}
    </div>
  );
};

export default ContractDetailPage;
