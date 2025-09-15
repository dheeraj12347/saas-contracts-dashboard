import React, { useState } from 'react';

const LoginForm = ({ onLogin, error, loading }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials.username, credentials.password);
  };

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your contracts dashboard</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter password (use: test123)"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          
          <div className="text-center text-sm text-gray-500">
            <p>Demo: any username, password: <code className="bg-gray-100 px-2 py-1 rounded">test123</code></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
