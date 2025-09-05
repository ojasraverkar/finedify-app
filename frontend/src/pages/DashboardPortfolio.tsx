import React, { useState, useEffect } from 'react';
// import TradingSimulator from '../components/TradingSimulator';
import Portfolio from '../components/Portfolio';

export default function DashboardPortfolio({ user, fetchUserData }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col">
      <header className="w-full py-6 px-8 bg-white shadow flex items-center justify-between border-b-2 border-orange-200">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-tight">Virtual Portfolio & Trading</h1>
        {/* Add user info or quick actions here if needed */}
      </header>
      <div className="flex flex-1 w-full h-full flex-col bg-gradient-to-br from-orange-50 via-white to-blue-50 gap-12 py-12 items-center justify-start">
        <div className="w-full bg-white rounded-2xl shadow-2xl border-4 border-orange-200 p-12 flex flex-col items-center justify-center gap-8" style={{ minHeight: '600px' }}>
          {/* TradingSimulator removed as requested */}
        </div>
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border-4 border-blue-200 p-10 flex flex-col items-center justify-center gap-8 overflow-x-auto">
          <Portfolio portfolio={user?.portfolio || []} fetchUserData={fetchUserData} />
        </div>
        {/* Watchlist can be added here if you have a component, e.g. <Watchlist /> */}
      </div>
    </div>
  );
}
