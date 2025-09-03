require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Explicit CORS Configuration to allow your frontend
const corsOptions = {
  origin: 'http://localhost:8080', // Your frontend's address
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully. ✅'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/market', require('./routes/market'));
app.use('/api/portfolio', require('./routes/portfolio'));

app.listen(PORT, () => console.log(`Server is happily running on port ${PORT} 🎉`));