// finedify-backend/models/Quiz.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  moduleId: Number,
  moduleTitle: String,
  quizTitle: String,
  questionText: String,
  questionType: String, // 'multiple-choice', 'true-false', 'scenario', 'drag-drop', etc.
  options: [String], // For MCQ, drag-drop, etc.
  correctAnswer: mongoose.Schema.Types.Mixed, // String, Array, or Boolean
  explanation: String,
  difficulty: String, // 'Beginner', 'Intermediate', 'Advanced', 'Critical'
});

const QuizSchema = new mongoose.Schema({
  moduleId: Number,
  moduleTitle: String,
  quizTitle: String,
  questions: [QuestionSchema],
});

module.exports = mongoose.model('quiz', QuizSchema);
