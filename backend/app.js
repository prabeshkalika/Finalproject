require('dotenv').config(); // Add this line to load environment variables
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Retrieve environment variables
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

console.log('MongoDB URI:', mongodbUri); // Add this line

// Connect to MongoDB
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process on connection error
  });

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

