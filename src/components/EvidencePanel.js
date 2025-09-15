// src/components/EvidencePanel.js
import React from 'react';

const EvidencePanel = ({ evidence, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-white w-full max-w-md h-full shadow-xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Evidence Snippets</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto h-full">
          {evidence && evidence.length > 0 ? (
            <div className="space-y-4">
              {evidence.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary-600">{item.source}</span>
                    <span className="text-xs text-gray-500">
                      {Math.round(item.relevance * 100)}% relevant
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{item.snippet}</p>
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Relevance:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-primary-500 h-1.5 rounded-full"
                          style={{ width: `${item.relevance * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <p>No evidence snippets available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvidencePanel;
