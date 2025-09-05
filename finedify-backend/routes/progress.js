// finedify-backend/routes/progress.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const User = require('../models/User');

// GET /api/progress - Get user's education module progress
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.educationProgress || {});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/progress - Update user's education module progress
router.post('/', auth, async (req, res) => {
  const { moduleId, lessonIndex } = req.body;
  if (typeof moduleId === 'undefined' || typeof lessonIndex === 'undefined') {
    return res.status(400).json({ msg: 'moduleId and lessonIndex required' });
  }
  try {
    const user = await User.findById(req.user.id);
    user.educationProgress = user.educationProgress || {};
    user.educationProgress.set(String(moduleId), lessonIndex);
    await user.save();
    res.json(user.educationProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
