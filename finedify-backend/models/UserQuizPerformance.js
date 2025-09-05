// finedify-backend/models/UserQuizPerformance.js
const mongoose = require('mongoose');

const UserQuizPerformanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  moduleId: Number,
  quizTitle: String,
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    timestamp: { type: Date, default: Date.now }
  }],
  score: Number,
  totalQuestions: Number,
  accuracy: Number,
  badges: [String],
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('userquizperformance', UserQuizPerformanceSchema);
