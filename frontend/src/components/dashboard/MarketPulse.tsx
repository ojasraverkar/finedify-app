import React from 'react';

const topHeadlines = [
  { id: 1, text: "RBI holds repo rate steady in its latest monetary policy review, citing inflation concerns." },
  { id: 2, text: "IT and Pharma sectors see bullish trends as global demand strengthens." },
  { id: 3, text: "SEBI introduces new T+0 settlement cycle for select stocks to boost market liquidity." },
];

export default function MarketPulse() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Market Pulse</h3>
      
      {/* Sentiment Meter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-gray-600">Market Sentiment</span>
          <span className="text-lg font-bold text-green-600">Slightly Bullish 🐂</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
            style={{ width: '65%' }} // Static value for demo
          ></div>
        </div>
      </div>

      {/* Top Headlines */}
      <div>
        <h4 className="font-bold text-gray-700 mb-3">Top Headlines</h4>
        <ul className="space-y-3">
          {topHeadlines.map(headline => (
            <li key={headline.id} className="text-gray-600 text-sm border-l-4 border-orange-400 pl-3">
              {headline.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}