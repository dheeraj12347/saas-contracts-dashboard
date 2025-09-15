import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useContracts } from '../contexts/ContractsContext';

const InsightsPage = () => {
  const { contracts } = useContracts();

  const getInsightsData = () => {
    const totalContracts = contracts.length;
    const activeContracts = contracts.filter(c => c.status === 'Active').length;
    const highRiskContracts = contracts.filter(c => c.risk === 'High').length;
    const renewalDue = contracts.filter(c => c.status === 'Renewal Due').length;

    return {
      totalContracts,
      activeContracts,
      highRiskContracts,
      renewalDue,
      riskDistribution: {
        low: contracts.filter(c => c.risk === 'Low').length,
        medium: contracts.filter(c => c.risk === 'Medium').length,
        high: highRiskContracts
      }
    };
  };

  const insights = getInsightsData();

  const InsightCard = ({ title, value, subtitle, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Contract Insights</h1>
              <p className="text-gray-600 mt-2">AI-powered analytics and contract intelligence</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <InsightCard 
                title="Total Contracts" 
                value={insights.totalContracts} 
                subtitle="Active portfolio"
                color="blue"
              />
              <InsightCard 
                title="Active Contracts" 
                value={insights.activeContracts} 
                subtitle="Currently running"
                color="green"
              />
              <InsightCard 
                title="High Risk" 
                value={insights.highRiskContracts} 
                subtitle="Require attention"
                color="red"
              />
              <InsightCard 
                title="Renewal Due" 
                value={insights.renewalDue} 
                subtitle="Next 90 days"
                color="orange"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Distribution */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Low Risk</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(insights.riskDistribution.low / insights.totalContracts) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{insights.riskDistribution.low}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Medium Risk</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${(insights.riskDistribution.medium / insights.totalContracts) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{insights.riskDistribution.medium}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">High Risk</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${(insights.riskDistribution.high / insights.totalContracts) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{insights.riskDistribution.high}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Recommendations</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-400 pl-4">
                    <p className="text-sm font-medium text-red-800">High Priority</p>
                    <p className="text-xs text-red-600 mt-1">
                      2 contracts have liability clauses that exclude data breach costs
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <p className="text-sm font-medium text-yellow-800">Medium Priority</p>
                    <p className="text-xs text-yellow-600 mt-1">
                      Review auto-renewal clauses in 3 upcoming renewals
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-4">
                    <p className="text-sm font-medium text-blue-800">Opportunity</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Consider standardizing termination notice periods across contracts
                    </p>
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

export default InsightsPage;
