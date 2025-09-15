// src/components/UploadModal.js
import React, { useState } from 'react';

const UploadModal = ({ onClose }) => {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const fileObjects = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading',
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...fileObjects]);
    
    // Simulate upload
    fileObjects.forEach(fileObj => {
      simulateUpload(fileObj.id);
    });
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'success', progress: 100 }
            : f
        ));
        clearInterval(interval);
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: Math.min(progress, 100) }
            : f
        ));
      }
    }, 200);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading': return '⏳';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '📄';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Upload Contracts</h3>
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
        
        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-4xl mb-4">📁</div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-gray-500 mb-4">
              Supports PDF, DOC, DOCX files up to 10MB
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 cursor-pointer"
            >
              Choose Files
            </label>
          </div>
          
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {files.map((fileObj) => (
                  <div key={fileObj.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{getStatusIcon(fileObj.status)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {fileObj.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      {fileObj.status === 'uploading' && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${fileObj.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFile(fileObj.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
