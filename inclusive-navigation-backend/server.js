require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Inclusive Navigation API Running');
});

const venueRoutes = require('./routes/venues');
app.use('/api/venues', venueRoutes);

// Start server AFTER routes are set
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
