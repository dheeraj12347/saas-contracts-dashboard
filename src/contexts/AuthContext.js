// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUser({ username: localStorage.getItem('username') });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    if (password === 'test123') {
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      setUser({ username });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
