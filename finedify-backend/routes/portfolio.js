// finedify-backend/routes/portfolio.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   POST api/portfolio/buy
// @desc    Buy a stock
// @access  Private
router.post('/buy', auth, async (req, res) => {
  const { symbol, quantity, price } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const totalCost = quantity * price;

    if (user.virtualBalance < totalCost) {
      return res.status(400).json({ msg: 'Insufficient funds' });
    }

    user.virtualBalance -= totalCost;

    const stockIndex = user.portfolio.findIndex(s => s.stockSymbol === symbol);

    if (stockIndex > -1) {
      user.portfolio[stockIndex].quantity += quantity;
    } else {
      user.portfolio.push({ stockSymbol: symbol, quantity, purchasePrice: price });
    }

    await user.save();
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/portfolio/sell
// @desc    Sell (drop) a stock
// @access  Private
router.post('/sell', auth, async (req, res) => {
  const { symbol, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const stockIndex = user.portfolio.findIndex(s => s.stockSymbol === symbol);
    if (stockIndex === -1) {
      return res.status(400).json({ msg: 'You do not own this stock.' });
    }
    if (user.portfolio[stockIndex].quantity < quantity) {
      return res.status(400).json({ msg: 'Not enough quantity to sell.' });
    }
    // Add funds back to virtual balance at purchase price
    user.virtualBalance += quantity * user.portfolio[stockIndex].purchasePrice;
    user.portfolio[stockIndex].quantity -= quantity;
    if (user.portfolio[stockIndex].quantity === 0) {
      user.portfolio.splice(stockIndex, 1);
    }
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;