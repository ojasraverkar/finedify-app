import React, { useState } from 'react';
import { portfolioHoldings, watchlistItems } from '../../data/mockPortfolio';

export default function Portfolio() {
  const [activeView, setActiveView] = useState('portfolio');

  const calculateTotalValue = () => {
    return portfolioHoldings.reduce((total, stock) => total + stock.shares * stock.currentPrice, 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">My Trading Desk</h3>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveView('portfolio')}
            className={`px-4 py-1 text-sm font-semibold rounded-md transition ${activeView === 'portfolio' ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveView('watchlist')}
            className={`px-4 py-1 text-sm font-semibold rounded-md transition ${activeView === 'watchlist' ? 'bg-green-600 text-white shadow' : 'text-gray-600'}`}
          >
            Watchlist
          </button>
        </div>
      </div>

      {activeView === 'portfolio' && (
        <div>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg text-center">
            <span className="text-sm text-blue-800">Total Portfolio Value</span>
            <p className="text-3xl font-bold text-blue-700">{calculateTotalValue()}</p>
          </div>
          <div className="space-y-3">
            {portfolioHoldings.map(stock => {
              const pnl = (stock.currentPrice - stock.avgPrice) * stock.shares;
              const pnlPercent = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
              const isProfit = pnl >= 0;
              return (
                <div key={stock.id} className="grid grid-cols-3 items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-800">{stock.id}</p>
                    <p className="text-xs text-gray-500">{stock.shares} Shares</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{stock.currentPrice.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Avg. {stock.avgPrice.toFixed(2)}</p>
                  </div>
                  <div className={`text-right font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    <p>{pnl.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
                    <p className="text-sm">({pnlPercent.toFixed(2)}%)</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeView === 'watchlist' && (
        <div className="space-y-2">
          {watchlistItems.map(stock => {
            const isUp = stock.dayChange >= 0;
            return (
              <div key={stock.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-bold text-gray-800">{stock.id}</p>
                  <p className="text-xs text-gray-500">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{stock.currentPrice.toFixed(2)}</p>
                  <p className={`text-sm font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                    {isUp ? '▲' : '▼'} {stock.dayChange.toFixed(2)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}