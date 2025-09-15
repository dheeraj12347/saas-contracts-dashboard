// src/components/InsightList.js
import React from 'react';

const InsightList = ({ insights }) => {
  const getSeverityIcon = (risk) => {
    switch (risk) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  const getSeverityColor = (risk) => {
    switch (risk) {
      case 'High': return 'border-red-200 bg-red-50';
      case 'Medium': return 'border-yellow-200 bg-yellow-50';
      case 'Low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  if (!insights || insights.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">🤖</div>
        <p>No AI insights available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {insights.map((insight, index) => (
        <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(insight.risk)}`}>
          <div className="flex items-start space-x-3">
            <span className="text-lg">{getSeverityIcon(insight.risk)}</span>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  insight.risk === 'High' ? 'bg-red-100 text-red-800' :
                  insight.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {insight.risk} Risk
                </span>
              </div>
              <p className="text-sm text-gray-700">{insight.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsightList;
