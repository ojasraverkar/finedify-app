import React, { useState } from 'react';
import axios from 'axios';
import { FaChartLine, FaTrash, FaEdit } from 'react-icons/fa';

// Define the shape of a single stock holding in the portfolio
interface PortfolioItem {
  stockSymbol: string;
  quantity: number;
  purchasePrice: number;
  tradeDate: string;
}

// Define the props for this component
interface PortfolioProps {
  portfolio: PortfolioItem[];
  fetchUserData: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio, fetchUserData }) => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<PortfolioItem>({ stockSymbol: '', quantity: 0, purchasePrice: 0, tradeDate: '' });
  const [wishlist, setWishlist] = useState<PortfolioItem[]>([]);
  const [showMarketModal, setShowMarketModal] = useState<{idx: number, stock: PortfolioItem} | null>(null);

  // Calculate total value and gains/losses (mock logic)
  const totalValue = portfolio.reduce((sum, stock) => sum + stock.quantity * stock.purchasePrice, 0);
  const totalGain = totalValue * 0.05;

  const openAddModal = () => {
    setEditIndex(null);
    setForm({ stockSymbol: '', quantity: 0, purchasePrice: 0, tradeDate: '' });
    setShowModal(true);
  };

  const openEditModal = (idx: number) => {
    setEditIndex(idx);
    setForm(portfolio[idx]);
    setShowModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'quantity' || name === 'purchasePrice' ? Number(value) : value }));
  };

  // Backend integration for add/edit/remove (mock, replace with API calls as needed)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editIndex === null) {
        // Add new stock
        await axios.post(`${import.meta.env.VITE_API_URL}/portfolio/add`, form, {
          headers: { 'x-auth-token': token },
        });
      } else {
        // Edit existing stock
        await axios.put(`${import.meta.env.VITE_API_URL}/portfolio/edit/${portfolio[editIndex].stockSymbol}`, form, {
          headers: { 'x-auth-token': token },
        });
      }
    } catch (err) {
      // Optionally show error
    }
    setShowModal(false);
    fetchUserData();
  };

  const handleRemove = async (idx: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/portfolio/remove/${portfolio[idx].stockSymbol}`, {
        headers: { 'x-auth-token': token },
      });
    } catch (err) {
      // Optionally show error
    }
    fetchUserData();
  };

  if (!portfolio || portfolio.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center px-0 md:px-0 xl:px-0 py-16">
        <img src="/assets/hero-bg.jpg" alt="Empty Portfolio" className="w-24 h-24 mb-4 rounded-xl shadow-lg" />
        <h2 className="text-2xl font-bold mb-2 text-blue-700">No stocks in your portfolio yet.</h2>
        <p className="text-gray-500 mb-4">Start trading to build your portfolio!</p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            const sim = document.getElementById('trading-simulator');
            if (sim) sim.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        >
          Trade Now
        </button>
      </div>
    );
  }

  return (
  <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-stretch px-4 md:px-8 xl:px-16">
  <div className="portfolio p-10 bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-3xl shadow-lg border-2 border-orange-300 w-full h-full">
          {/* Disclaimer removed: now shown app-wide in Footer */}
          {/* Summary Card */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 bg-gradient-to-r from-blue-50 via-white to-orange-50 rounded-xl border-2 border-blue-100 shadow">
            <div className="flex items-center gap-3">
              <FaChartLine className="text-blue-600 text-3xl" />
              <div>
                <div className="text-lg font-bold text-blue-700">Total Value</div>
                <div className="text-2xl font-extrabold text-orange-500">₹{totalValue.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`font-bold text-lg ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>{totalGain >= 0 ? '+' : ''}₹{totalGain.toLocaleString()} ({totalGain >= 0 ? 'Gain' : 'Loss'})</span>
            </div>
          </div>
          {/* Modern Table */}
          <div className="w-full">
            <table className="w-full text-left rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-100 text-blue-700">
                  <th className="p-2" title="Stock symbol">Symbol</th>
                  <th className="p-2" title="Number of shares owned">Quantity</th>
                  <th className="p-2" title="Purchase price per share">Purchase Price</th>
                  <th className="p-2" title="Trade Date">Trade Date</th>
                  <th className="p-2" title="Estimated gain/loss">Gain/Loss</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock, idx) => {
                  const gain = stock.quantity * stock.purchasePrice * 0.05;
                  return (
                    <tr key={stock.stockSymbol + idx} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-orange-50'} hover:bg-blue-50 transition`}>
                      <td className="p-2 font-semibold flex items-center gap-2"><FaChartLine className="text-blue-400" />{stock.stockSymbol}</td>
                      <td className="p-2">{stock.quantity}</td>
                      <td className="p-2">₹{stock.purchasePrice.toFixed(2)}</td>
                      <td className="p-2">{stock.tradeDate}</td>
                      <td className={`p-2 font-bold ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>{gain >= 0 ? '+' : ''}₹{gain.toFixed(2)}</td>
                      <td className="p-2 flex gap-2">
                        <button className="text-blue-600 hover:text-orange-500" onClick={() => openEditModal(idx)} title="Edit"><FaEdit /></button>
                        <button className="text-red-600 hover:text-blue-600" onClick={() => handleRemove(idx)} title="Remove"><FaTrash /></button>
                        <button className="text-green-600 hover:text-blue-700" onClick={() => setShowMarketModal({idx, stock})} title="View Market Data">View Market Data</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Quick Action Button */}
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold shadow hover:bg-blue-700 transition" onClick={openAddModal}>Add Stock</button>
          </div>
          {/* Modal for Add/Edit */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <form className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full" onSubmit={handleFormSubmit}>
                <h3 className="text-xl font-bold mb-4">{editIndex !== null ? 'Edit Stock' : 'Add Stock'}</h3>
                <input name="stockSymbol" placeholder="Symbol" className="mb-2 p-2 w-full border rounded" value={form.stockSymbol} onChange={handleFormChange} required />
                <input name="quantity" type="number" placeholder="Quantity" className="mb-2 p-2 w-full border rounded" value={form.quantity} onChange={handleFormChange} required />
                <input name="purchasePrice" type="number" placeholder="Purchase Price" className="mb-2 p-2 w-full border rounded" value={form.purchasePrice} onChange={handleFormChange} required />
                <input name="tradeDate" type="date" className="mb-2 p-2 w-full border rounded" value={form.tradeDate} onChange={handleFormChange} required />
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Save</button>
                  <button type="button" className="px-4 py-2 bg-gray-300 rounded font-bold" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
          {/* Modal for Market Data */}
          {showMarketModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in border-4 border-blue-200">
                <button className="absolute top-2 right-2 text-xl text-orange-500 hover:text-blue-600" onClick={() => setShowMarketModal(null)}>×</button>
                <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">{showMarketModal.stock.stockSymbol} Market Data</h3>
                <div className="mb-2 text-lg flex items-center gap-2">
                  <span className="font-bold">Current Price:</span> <span className="text-blue-700">₹{(showMarketModal.stock.purchasePrice * (1 + Math.random() * 0.1 - 0.05)).toFixed(2)}</span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-bold">Change:</span> <span className={Math.random() > 0.5 ? 'text-green-600' : 'text-red-600'}>{Math.random() > 0.5 ? '+' : '-'}{(Math.random()*10).toFixed(2)}%</span>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-2">
                  <span className="font-bold">52-Week High:</span> <span>₹{(showMarketModal.stock.purchasePrice * 1.2).toFixed(2)}</span>
                  <span className="font-bold">52-Week Low:</span> <span>₹{(showMarketModal.stock.purchasePrice * 0.8).toFixed(2)}</span>
                  <span className="font-bold">Volume:</span> <span>{Math.floor(Math.random()*1000000).toLocaleString()}</span>
                </div>
                <div className="mb-4">
                  <span className="font-bold">Mini Chart:</span>
                  <div className="w-full h-16 bg-gradient-to-r from-blue-200 via-orange-200 to-blue-100 rounded mt-2 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
                </div>
                <button className="px-4 py-2 bg-orange-500 text-white rounded font-bold shadow hover:bg-blue-600 transition" onClick={() => {
                  setWishlist((prev) => {
                    if (!prev.find(w => w.stockSymbol === showMarketModal.stock.stockSymbol)) {
                      return [...prev, showMarketModal.stock];
                    }
                    return prev;
                  });
                  setShowMarketModal(null);
                }}>Add to Wishlist</button>
              </div>
            </div>
          )}
          {/* Wishlist Section */}
          {wishlist.length > 0 && (
            <div className="mt-8 p-4 bg-orange-50 rounded-xl border-2 border-orange-200 shadow">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Wishlist</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-orange-100 text-orange-700">
                    <th className="p-2">Symbol</th>
                    <th className="p-2">Current Price</th>
                    <th className="p-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((stock, idx) => (
                    <tr key={stock.stockSymbol + idx} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-orange-50'} hover:bg-blue-50 transition`}>
                      <td className="p-2 font-semibold flex items-center gap-2"><FaChartLine className="text-orange-400" />{stock.stockSymbol}</td>
                      <td className="p-2">₹{(stock.purchasePrice * (1 + Math.random() * 0.1 - 0.05)).toFixed(2)}</td>
                      <td className="p-2">
                        <button className="text-red-600 hover:text-blue-600" onClick={() => setWishlist(wishlist.filter((_, i) => i !== idx))} title="Remove"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
  );
};

export default Portfolio;