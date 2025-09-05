// finedify-backend/routes/quiz.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Quiz = require('../models/Quiz');
const UserQuizPerformance = require('../models/UserQuizPerformance');

// GET /api/quiz - Get all quizzes (public)
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET /api/quiz/:moduleId - Get quizzes for a module
router.get('/:moduleId', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ moduleId: req.params.moduleId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST /api/quiz/submit - Submit answers and get performance (private)
router.post('/submit', auth, async (req, res) => {
  const { moduleId, quizTitle, answers } = req.body;
  try {
    const quiz = await Quiz.findOne({ moduleId, quizTitle });
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
    let correctCount = 0;
    const answerResults = quiz.questions.map((q, idx) => {
      const userAnswer = answers[idx];
      const isCorrect = JSON.stringify(userAnswer.selectedAnswer) === JSON.stringify(q.correctAnswer);
      if (isCorrect) correctCount++;
      return {
        questionId: q._id,
        selectedAnswer: userAnswer.selectedAnswer,
        isCorrect,
        timestamp: new Date()
      };
    });
    const score = correctCount;
    const totalQuestions = quiz.questions.length;
    const accuracy = Math.round((score / totalQuestions) * 100);
    // Badge logic (simple example)
    const badges = [];
    if (accuracy >= 80) badges.push('Indian Market Master');
    if (score === totalQuestions) badges.push('Perfect Score');
    // Save performance
    const perf = new UserQuizPerformance({
      userId: req.user.id,
      moduleId,
      quizTitle,
      answers: answerResults,
      score,
      totalQuestions,
      accuracy,
      badges,
      completedAt: new Date()
    });
    await perf.save();
    res.json({ score, totalQuestions, accuracy, badges, answerResults });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET /api/quiz/performance - Get user's quiz performance (private)
router.get('/performance', auth, async (req, res) => {
  try {
    const performances = await UserQuizPerformance.find({ userId: req.user.id });
    res.json(performances);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
