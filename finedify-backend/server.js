require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware FIRST
// Allow all origins for local development
app.use(cors());

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully. ✅'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/market', require('./routes/market'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/content', require('./routes/content'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/quiz', require('./routes/quiz'));

app.listen(PORT, () => console.log(`Server is happily running on port ${PORT} 🎉`));