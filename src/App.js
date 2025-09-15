// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ContractsProvider } from './contexts/ContractsContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContractDetailPage from './pages/ContractDetailPage';
import InsightsPage from './pages/InsightsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


function App() {
  return (
    <AuthProvider>
      <ContractsProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/contract/:id" 
                element={
                  <ProtectedRoute>
                    <ContractDetailPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/insights" 
                element={
                  <ProtectedRoute>
                    <InsightsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute>
                    <ReportsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </ContractsProvider>
    </AuthProvider>
  );
}


export default App;
