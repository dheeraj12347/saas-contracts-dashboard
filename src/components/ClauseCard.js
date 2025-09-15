// src/components/ClauseCard.js
import React from 'react';

const ClauseCard = ({ clause }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-gray-900">{clause.title}</h3>
        <span className={`text-sm font-medium ${getConfidenceColor(clause.confidence)}`}>
          {Math.round(clause.confidence * 100)}%
        </span>
      </div>
      <p className="text-gray-600 text-sm">{clause.summary}</p>
      <div className="mt-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Confidence:</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                clause.confidence >= 0.8 ? 'bg-green-500' : 
                clause.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${clause.confidence * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClauseCard;
