// finedify-backend/routes/market.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/authMiddleware');

router.get('/quote/:symbol', auth, async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    
    // Using a public, unofficial API for NSE data
    const url = `https://www.nseindia.com/api/quote-equity?symbol=${symbol}`;

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br'
    };
    
    const response = await axios.get(url, { headers });
    const priceInfo = response.data.priceInfo;

    if (!priceInfo || !priceInfo.lastPrice) {
      return res.status(404).json({ msg: 'Stock symbol data not found on NSE' });
    }

    const quote = {
      symbol: response.data.info.symbol,
      name: response.data.info.companyName,
      price: priceInfo.lastPrice,
    };

    res.json(quote);
  } catch (err) {
    console.error("Backend API call failed:", err.message);
    res.status(404).json({ msg: 'Could not fetch data for the symbol.' });
  }
});

module.exports = router;