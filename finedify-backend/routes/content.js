// finedify-backend/routes/content.js
const express = require('express');
const router = express.Router();

const modules = [
  { id: 1, title: 'What is a Stock?', summary: 'Learn the basics of stocks and ownership.' },
  { id: 2, title: 'Understanding Risk', summary: 'Explore different types of investment risks.' },
  { id: 3, title: 'Portfolio Diversification', summary: 'Why you should not put all your eggs in one basket.' },
  { id: 4, title: 'Reading Financial Statements', summary: 'How to analyze a company\'s health.' }
];

router.get('/modules', (req, res) => {
  res.json(modules);
});

module.exports = router;