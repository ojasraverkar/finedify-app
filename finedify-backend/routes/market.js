const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Hardcoded stock list (symbol, name, price)
const STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2500 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3700 },
  { symbol: 'INFY', name: 'Infosys', price: 1500 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1700 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1100 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 600 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 950 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2600 },
  { symbol: 'ITC', name: 'ITC', price: 450 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1800 },
  { symbol: 'LT', name: 'Larsen & Toubro', price: 3200 },
  { symbol: 'AXISBANK', name: 'Axis Bank', price: 1050 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 11000 },
  { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: 1200 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 7000 },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', price: 9500 },
  { symbol: 'TITAN', name: 'Titan Company', price: 3500 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 3200 },
  { symbol: 'HCLTECH', name: 'HCL Technologies', price: 1400 },
  { symbol: 'POWERGRID', name: 'Power Grid', price: 250 },
  { symbol: 'ADANIGREEN', name: 'Adani Green', price: 1100 },
  { symbol: 'ADANIPORTS', name: 'Adani Ports', price: 1200 },
  { symbol: 'DIVISLAB', name: 'Divi’s Laboratories', price: 3700 },
  { symbol: 'GRASIM', name: 'Grasim Industries', price: 2100 },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv', price: 17000 },
  { symbol: 'NTPC', name: 'NTPC', price: 300 },
  { symbol: 'ONGC', name: 'ONGC', price: 180 },
  { symbol: 'COALINDIA', name: 'Coal India', price: 250 },
  { symbol: 'TECHM', name: 'Tech Mahindra', price: 1200 },
  { symbol: 'WIPRO', name: 'Wipro', price: 450 },
  { symbol: 'BRITANNIA', name: 'Britannia', price: 4700 },
  { symbol: 'CIPLA', name: 'Cipla', price: 1200 },
  { symbol: 'NESTLEIND', name: 'Nestle India', price: 24000 },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp', price: 3000 },
  { symbol: 'EICHERMOT', name: 'Eicher Motors', price: 4000 },
  { symbol: 'M&M', name: 'Mahindra & Mahindra', price: 1700 },
  { symbol: 'DRREDDY', name: 'Dr. Reddy’s', price: 5400 },
  { symbol: 'HDFCLIFE', name: 'HDFC Life', price: 600 },
  { symbol: 'SBILIFE', name: 'SBI Life', price: 1400 },
  { symbol: 'ICICIPRULI', name: 'ICICI Prudential Life', price: 600 },
  { symbol: 'SHREECEM', name: 'Shree Cement', price: 27000 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 900 },
  { symbol: 'TATASTEEL', name: 'Tata Steel', price: 120 },
  { symbol: 'JSWSTEEL', name: 'JSW Steel', price: 850 },
  { symbol: 'PIDILITIND', name: 'Pidilite Industries', price: 2900 },
  { symbol: 'HAVELLS', name: 'Havells India', price: 1400 },
  { symbol: 'DABUR', name: 'Dabur India', price: 550 },
  { symbol: 'AMBUJACEM', name: 'Ambuja Cements', price: 600 },
  { symbol: 'GAIL', name: 'GAIL', price: 120 },
];

// Get all stocks
router.get('/stocks', auth, (req, res) => {
  res.json(STOCKS);
});

// Get quote for a stock
router.get('/quote/:symbol', auth, (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const stock = STOCKS.find(s => s.symbol === symbol);
  if (!stock) {
    return res.status(404).json({ msg: 'Stock not found.' });
  }
  res.json(stock);
});

module.exports = router;