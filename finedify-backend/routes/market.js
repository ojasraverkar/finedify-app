const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/authMiddleware');

router.get('/quote/:symbol', auth, async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    
    // The URL of your new Streamlit data API
    const dataApiUrl = `http://localhost:8501/?symbol=${symbol}`;

    console.log(`[Node Backend] Fetching data from Streamlit API for: ${symbol}`);
    
    const response = await axios.get(dataApiUrl);
    
    if (response.data.error) {
      return res.status(404).json({ msg: response.data.error });
    }

    res.json(response.data);

  } catch (err) {
    console.error("Failed to fetch from Streamlit API:", err.message);
    res.status(500).json({ msg: 'Could not connect to the data service.' });
  }
});

module.exports = router;