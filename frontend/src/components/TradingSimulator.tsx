import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Stock = { symbol: string; name: string };
type Quote = { symbol: string; name: string; price: number };
type TradingSimulatorProps = { user: any; onTransaction: () => void };

const TradingSimulator: React.FC<TradingSimulatorProps> = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStocks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/market/stocks`, {
          headers: { 'x-auth-token': token },
        });
        setStocks(res.data);
      } catch (err) {
        setError('Could not fetch stock list.');
      }
    };
    fetchStocks();
  }, []);

  const handleFetchQuote = async () => {
    const token = localStorage.getItem('token');
    if (!selectedSymbol) {
      setError('Please select a stock.');
      return;
    }
    setError('');
    setQuote(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/market/quote/${selectedSymbol}`, {
        headers: { 'x-auth-token': token },
      });
      setQuote(res.data);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Could not fetch quote.');
    }
  };

  return (
    <div className="trading-simulator-card w-full h-full flex flex-col items-center justify-center gap-8">
      <h2 className="text-2xl font-bold mb-4 text-orange-700">Trading Simulator</h2>
      <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-2xl border-2 border-orange-200 p-8 flex flex-col gap-6">
        <select
          className="p-2 border rounded mb-2"
          value={selectedSymbol}
          onChange={e => setSelectedSymbol(e.target.value)}
        >
          <option value="">Select Stock</option>
          {stocks.map(stock => (
            <option key={stock.symbol} value={stock.symbol}>{stock.symbol} - {stock.name}</option>
          ))}
        </select>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleFetchQuote}
        >Get Live Price</button>
        {quote && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <div className="font-bold text-lg text-blue-700">{quote.symbol} - ₹{quote.price}</div>
            <div className="text-sm text-gray-600">{quote.name}</div>
          </div>
        )}
        {error && <div className="text-red-600 font-bold mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default TradingSimulator;