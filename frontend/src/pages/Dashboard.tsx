import React from 'react';
import Header from '../components/layout/Header';
import { BADGES } from '../constants';

// Corrected: Added the 'dashboard' sub-folder to the paths
import AICoach from '../components/dashboard/AICoach';
import MarketPulse from '../components/dashboard/MarketPulse';
import Portfolio from '../components/dashboard/Portfolio';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export default function Dashboard({ username, onLogout }: DashboardProps) {
  const user = { modulesCompleted: 2, quizzesTaken: 1 };
  const dailyStreak = 5;
  
  return (
    <>
      <Header isLoggedIn={true} username={username} onLogout={onLogout} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 pb-2">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-600">{user.modulesCompleted}</span>
              <span className="text-sm text-gray-600 mt-1">Modules Done</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl font-bold text-green-600">{user.quizzesTaken}</span>
              <span className="text-sm text-gray-600 mt-1">Quizzes Taken</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-3xl font-bold text-yellow-600">5</span>
              <span className="text-sm text-gray-600 mt-1">Portfolio Items</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-2 border-orange-400">
              <span className="text-3xl font-bold text-orange-500">🔥 {dailyStreak}</span>
              <span className="text-sm text-gray-600 mt-1">Day Streak</span>
            </div>
          </div>

          <div className="my-6">
            <MarketPulse />
          </div>

          <Portfolio />

          <div className="my-6">
            <AICoach />
          </div>
          
        </div>
      </div>
    </>
  );
}