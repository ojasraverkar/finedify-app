import React, { useState } from 'react';

// Placeholder for DashboardModules component
const DashboardModules = () => (
  <div>
    <h3 className="text-xl font-bold mb-4 text-gray-800">Education Modules</h3>
    <p className="text-gray-600">Your learning modules will appear here. Keep up the great work!</p>
  </div>
);

// Placeholder for QuizDashboard component
const QuizDashboard = () => (
  <div>
    <h3 className="text-xl font-bold mb-4 text-gray-800">Quizzes</h3>
    <p className="text-gray-600">Test your knowledge. Available quizzes will be listed here.</p>
  </div>
);

// Placeholder for PortfolioTrading component
const PortfolioTrading = () => (
  <div>
    <h3 className="text-xl font-bold mb-4 text-gray-800">Portfolio & Trading</h3>
    <p className="text-gray-600">Manage your virtual portfolio and practice trading here.</p>
  </div>
);


export default function Dashboard({ publicView = false }) {
  // Demo user data
  const user = { modulesCompleted: 2, quizzesTaken: 1 };
  const badges = [
    { label: 'Beginner', color: 'bg-green-200 text-green-800' },
    { label: 'Quiz Master', color: 'bg-blue-200 text-blue-800' },
    { label: 'Investor', color: 'bg-yellow-200 text-yellow-800' },
  ];

  // Calculate user level and progress
  const level = user?.modulesCompleted ? Math.min(1 + user.modulesCompleted, 10) : 1;
  const progress = user?.modulesCompleted ? Math.min(user.modulesCompleted * 20, 100) : 0;

  // State for active tab
  const [activeTab, setActiveTab] = useState('modules');

  // A simplified view for public profiles
  if (publicView) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto mt-12 w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Virtual Portfolio</h2>
          <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center mb-6">
            <span className="text-4xl font-bold text-green-600 mb-2">₹11,25,000</span>
            <span className="text-lg text-gray-600">Portfolio Value</span>
            <span className="text-green-500 mt-2 font-semibold">+₹1,25,000 (12.5%)</span>
          </div>
        </div>
      </div>
    );
  }

  // The main dashboard view for the logged-in user
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 pb-2">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">{user.modulesCompleted}</span>
            <span className="text-sm text-gray-600 mt-1">Modules Completed</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-600">{user.quizzesTaken}</span>
            <span className="text-sm text-gray-600 mt-1">Quizzes Taken</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-600">5</span>
            <span className="text-sm text-gray-600 mt-1">Portfolio Items</span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="pt-8 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Your Progress</span>
            <span className="text-xs text-gray-500">{progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 h-4 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Badges & Level */}
        <div className="my-6">
          <div className="bg-yellow-50 rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-yellow-700 mb-2">Your Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, idx) => (
                  <span
                    key={badge.label}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badge.color} shadow-sm`}
                  >
                    <span className="mr-1">{idx === 0 ? '🌱' : idx === 1 ? '🧠' : '💰'}</span>
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center mt-4 md:mt-0">
              <span className="block text-2xl font-bold text-yellow-800">Level {level}</span>
              <span className="text-xs text-gray-600">Investor</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <div className="bg-blue-50 rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Recommended for You</h3>
            <ul className="space-y-2">
              {user.modulesCompleted === 0 && (
                <li className="bg-white rounded-lg p-4 shadow border-l-4 border-orange-400">
                  <span className="font-bold text-orange-500">Start with "Stock Market Basics" module</span> to build your foundation.
                </li>
              )}
              {user.modulesCompleted > 0 && user.modulesCompleted < 3 && (
                <li className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-400">
                  <span className="font-bold text-blue-600">Try the "Risk & Return" module</span> to deepen your understanding.
                </li>
              )}
              {user.quizzesTaken === 0 && (
                <li className="bg-white rounded-lg p-4 shadow border-l-4 border-green-400">
                  <span className="font-bold text-green-600">Take your first quiz</span> to test your investor literacy.
                </li>
              )}
              {user.modulesCompleted >= 3 && user.quizzesTaken >= 1 && (
                <li className="bg-white rounded-lg p-4 shadow border-l-4 border-purple-400">
                  <span className="font-bold text-purple-600">Explore advanced modules or scenario challenges</span> for real-world practice.
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Tabs */}
        <div className="pt-2 pb-8">
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <button
              className={`px-4 py-2 rounded-lg font-semibold focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg ${activeTab === 'modules' ? 'bg-blue-600 text-white scale-105' : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'}`}
              onClick={() => setActiveTab('modules')}
            >
              Education Modules
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg ${activeTab === 'quizzes' ? 'bg-green-600 text-white scale-105' : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'}`}
              onClick={() => setActiveTab('quizzes')}
            >
              Quizzes
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg ${activeTab === 'portfolio' ? 'bg-yellow-600 text-white scale-105' : 'bg-white text-yellow-600 border border-yellow-600 hover:bg-yellow-50'}`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio & Trading
            </button>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            {activeTab === 'modules' && <DashboardModules />}
            {activeTab === 'quizzes' && <QuizDashboard />}
            {activeTab === 'portfolio' && <PortfolioTrading />}
          </div>
        </div>
      </div>
    </div>
  );
}
