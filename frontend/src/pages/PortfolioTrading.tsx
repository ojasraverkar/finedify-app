import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SectorPieChart, ReturnsLineChart } from '../components/PortfolioTradingCharts';

// --- Types ---
type PortfolioItem = {
  ticker: string;
  quantity: number;
  buy_price: number;
  invested: number;
};
type Transaction = {
  ticker: string;
  action: string;
  quantity: number;
  price: number;
  date: string;
  brokerage: number;
};

type Analytics = {
  performance_vs_nifty: number;
  daily_returns: any[];
  weekly_returns: any[];
  volatility: number;
  sharpe_ratio: number;
};

export default function PortfolioTrading() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ticker: '', quantity: 0, buy_price: 0 });
  const [wallet, setWallet] = useState(100000); // Starting virtual wallet
  const [sectorData, setSectorData] = useState<any>(null);
  const [returnsData, setReturnsData] = useState<any>(null);
  const [benchmark, setBenchmark] = useState<any>(null);

  useEffect(() => {
    fetchPortfolio();
    fetchTransactions();
    fetchAnalytics();
    fetchSectorData();
    fetchReturnsData();
    fetchBenchmark();
  }, []);

  const fetchPortfolio = async () => {
  const res = await axios.get('/api/portfolio');
  setPortfolio(Array.isArray(res.data) ? res.data : []);
  };
  const fetchTransactions = async () => {
  const res = await axios.get('/api/transactions');
  setTransactions(Array.isArray(res.data) ? res.data : []);
  };
  const fetchAnalytics = async () => {
    const res = await axios.get('/api/analytics');
    setAnalytics(res.data);
  };
  const fetchSectorData = async () => {
    // Example sector allocation data for Pie chart
    setSectorData({
      labels: ['IT', 'Finance', 'Auto', 'Pharma'],
      datasets: [
        {
          label: 'Sector Allocation',
          data: [40, 30, 20, 10],
          backgroundColor: ['#3b82f6', '#f59e42', '#10b981', '#e11d48'],
          borderWidth: 1,
        },
      ],
    });
  };
  const fetchReturnsData = async () => {
    // Example returns data for Line chart
    setReturnsData({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Portfolio Returns',
          data: [1, 2, 1.5, 2.5, 3],
          fill: false,
          borderColor: '#3b82f6',
          backgroundColor: '#bfdbfe',
          tension: 0.4,
        },
      ],
    });
  };
  const fetchBenchmark = async () => {
    const res = await axios.get('/api/indices');
    setBenchmark(res.data);
  };

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/api/portfolio/add', {
      ticker: form.ticker,
      quantity: form.quantity,
      buy_price: form.buy_price,
      invested: form.quantity * form.buy_price,
    });
    setShowAdd(false);
    setForm({ ticker: '', quantity: 0, buy_price: 0 });
    fetchPortfolio();
  };

  const handleExport = async () => {
    const res = await axios.get('/api/export');
    const blob = new Blob([res.data.portfolio_csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white bg-blue-700 px-6 py-3 rounded-2xl border-4 border-orange-400 shadow-lg">Portfolio & Trading</h1>
        <button className="bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl border-4 border-orange-400 hover:bg-blue-800 transition" onClick={() => setShowAdd(true)}>Add Stock</button>
      </div>
      {/* Wallet Balance */}
      <div className="mb-8 flex items-center gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-xl font-bold text-blue-700 border-2 border-orange-400">Wallet Balance: ₹{wallet.toLocaleString()}</div>
        <button className="bg-orange-500 text-white font-bold px-6 py-3 rounded-2xl border-4 border-blue-400 hover:bg-orange-600 transition" onClick={handleExport}>Export Portfolio</button>
      </div>
      {/* Holdings Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Current Holdings</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="p-2">Ticker</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Buy Price</th>
              <th className="p-2">Invested</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(portfolio) && portfolio.map((item, idx) => (
              <tr key={item.ticker + idx} className="border-b">
                <td className="p-2 font-semibold">{item.ticker}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">₹{item.buy_price}</td>
                <td className="p-2">₹{item.invested}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Transactions</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-orange-100 text-orange-700">
              <th className="p-2">Ticker</th>
              <th className="p-2">Action</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Date</th>
              <th className="p-2">Brokerage</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(transactions) && transactions.map((txn, idx) => (
              <tr key={txn.ticker + idx} className="border-b">
                <td className="p-2 font-semibold">{txn.ticker}</td>
                <td className="p-2">{txn.action}</td>
                <td className="p-2">{txn.quantity}</td>
                <td className="p-2">₹{txn.price}</td>
                <td className="p-2">{txn.date}</td>
                <td className="p-2">₹{txn.brokerage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  {/* Charts removed for dashboard-only view */}
      {/* Benchmark Comparison */}
      {benchmark && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Benchmark Comparison</h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="font-bold">NIFTY 50:</div>
              <div className="text-green-600 text-2xl font-extrabold">₹{benchmark['NIFTY 50']}</div>
            </div>
            <div>
              <div className="font-bold">SENSEX:</div>
              <div className="text-orange-600 text-2xl font-extrabold">₹{benchmark['SENSEX']}</div>
            </div>
            <div>
              <div className="font-bold">BankNifty:</div>
              <div className="text-blue-600 text-2xl font-extrabold">₹{benchmark['BankNifty']}</div>
            </div>
          </div>
        </div>
      )}
  {/* Analytics Section removed for dashboard-only view */}
      {/* Add Stock Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full" onSubmit={handleAddStock}>
            <h3 className="text-xl font-bold mb-4">Add Stock</h3>
            <input name="ticker" placeholder="Ticker (e.g. TCS.NS)" className="mb-2 p-2 w-full border rounded" value={form.ticker} onChange={e => setForm(f => ({ ...f, ticker: e.target.value }))} required />
            <input name="quantity" type="number" placeholder="Quantity" className="mb-2 p-2 w-full border rounded" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))} required />
            <input name="buy_price" type="number" placeholder="Buy Price" className="mb-2 p-2 w-full border rounded" value={form.buy_price} onChange={e => setForm(f => ({ ...f, buy_price: Number(e.target.value) }))} required />
            <div className="flex gap-2 mt-4">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Save</button>
              <button type="button" className="px-4 py-2 bg-gray-300 rounded font-bold" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
