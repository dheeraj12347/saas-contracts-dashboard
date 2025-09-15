import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useContracts } from '../contexts/ContractsContext';

const ReportsPage = () => {
  const { contracts } = useContracts();
  const [selectedReport, setSelectedReport] = useState('overview');

  const exportReport = (format) => {
    // Simulate report export
    const data = contracts.map(contract => ({
      Name: contract.name,
      Parties: contract.parties,
      Status: contract.status,
      Risk: contract.risk,
      Expiry: contract.expiry
    }));
    
    alert(`Exporting ${data.length} contracts as ${format.toUpperCase()}`);
  };

  const reportTypes = [
    { id: 'overview', name: 'Contract Overview', description: 'Complete contract portfolio summary' },
    { id: 'renewals', name: 'Renewal Forecast', description: 'Upcoming renewals and projections' },
    { id: 'risk', name: 'Risk Analysis', description: 'Contract risk assessment report' },
    { id: 'compliance', name: 'Compliance Report', description: 'Regulatory compliance status' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600 mt-2">Generate and export contract reports</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Report Types */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">Available Reports</h3>
                  </div>
                  <div className="p-2">
                    {reportTypes.map((report) => (
                      <button
                        key={report.id}
                        onClick={() => setSelectedReport(report.id)}
                        className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                          selectedReport === report.id
                            ? 'bg-primary-50 text-primary-700 border border-primary-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{report.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{report.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Report Preview */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {reportTypes.find(r => r.id === selectedReport)?.name}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => exportReport('csv')}
                          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          Export CSV
                        </button>
                        <button
                          onClick={() => exportReport('excel')}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          Export Excel
                        </button>
                        <button
                          onClick={() => exportReport('pdf')}
                          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Export PDF
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    {selectedReport === 'overview' && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Contract Portfolio Summary</h4>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-600">Total Contracts</p>
                            <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-600">Active Contracts</p>
                            <p className="text-2xl font-bold text-green-600">
                              {contracts.filter(c => c.status === 'Active').length}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>This report includes detailed analysis of contract statuses, risk levels, and upcoming renewals.</p>
                        </div>
                      </div>
                    )}

                    {selectedReport === 'renewals' && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Renewal Forecast</h4>
                        <div className="space-y-3">
                          {contracts.filter(c => c.status === 'Renewal Due').map(contract => (
                            <div key={contract.id} className="flex items-center justify-between p-3 bg-orange-50 rounded">
                              <div>
                                <p className="font-medium text-gray-900">{contract.name}</p>
                                <p className="text-sm text-gray-600">{contract.parties}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-orange-600">Due: {contract.expiry}</p>
                                <p className="text-xs text-orange-500">Risk: {contract.risk}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedReport === 'risk' && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Risk Analysis</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">High Risk Contracts</span>
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                              {contracts.filter(c => c.risk === 'High').length}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Medium Risk Contracts</span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                              {contracts.filter(c => c.risk === 'Medium').length}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Low Risk Contracts</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {contracts.filter(c => c.risk === 'Low').length}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedReport === 'compliance' && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Compliance Status</h4>
                        <div className="bg-green-50 border border-green-200 p-4 rounded">
                          <div className="flex items-center">
                            <span className="text-green-600 text-lg mr-2">✅</span>
                            <div>
                              <p className="font-medium text-green-800">All contracts compliant</p>
                              <p className="text-sm text-green-600">No compliance issues detected</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;