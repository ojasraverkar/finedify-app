const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/authMiddleware');

router.get('/quote/:symbol', auth, async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const apiKey = process.env.FMP_API_KEY;
    
    // Using the Financial Modeling Prep API for Indian stocks (.NS suffix)
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}.NS?apikey=${apiKey}`;

    const response = await axios.get(url);
    
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ msg: 'Stock symbol not found.' });
    }
    
    const stockData = response.data[0];

    const quote = {
      symbol: stockData.symbol,
      name: stockData.name,
      price: stockData.price,
    };

    res.json(quote);
  } catch (err) {
    console.error("FMP API call failed:", err.message);
    res.status(404).json({ msg: 'Could not fetch data for the symbol.' });
  }
});

module.exports = router;