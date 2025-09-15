import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    contractReminders: true,
    weeklyReports: false,
    theme: 'light',
    language: 'en'
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🔐' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account and application preferences</p>
            </div>

            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                          type="text"
                          value={user?.username || ''}
                          disabled
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          placeholder="user@example.com"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                          <p className="text-xs text-gray-500">Receive email updates about your contracts</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Contract Reminders</p>
                          <p className="text-xs text-gray-500">Get reminded about contract renewals and deadlines</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.contractReminders}
                          onChange={(e) => handleSettingChange('contractReminders', e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Weekly Reports</p>
                          <p className="text-xs text-gray-500">Receive weekly contract portfolio summaries</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.weeklyReports}
                          onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Application Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Theme</label>
                        <select
                          value={settings.theme}
                          onChange={(e) => handleSettingChange('theme', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Language</label>
                        <select
                          value={settings.language}
                          onChange={(e) => handleSettingChange('language', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">API Access</h4>
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                          <p className="text-xs text-gray-600 mb-2">API Key:</p>
                          <div className="flex items-center space-x-2">
                            <code className="flex-1 text-xs bg-white border border-gray-300 rounded px-2 py-1 font-mono">
                              sk_test_4eC39HqLyjWDarjtT1zdp7dc...
                            </code>
                            <button className="text-xs px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700">
                              Regenerate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Change Password</h4>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <input
                            type="password"
                            placeholder="Current password"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          />
                          <input
                            type="password"
                            placeholder="New password"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={saveSettings}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
