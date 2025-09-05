// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Virtual balance defaults to 10 lakhs for Indian context
  virtualBalance: { type: Number, default: 1000000 },
  portfolio: [{
    stockSymbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now }
  }],
  // Education module progress: { moduleId: lessonIndex }
  educationProgress: {
    type: Map,
    of: Number,
    default: {}
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);