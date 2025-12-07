// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Allows the server to accept JSON in the body of requests
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// A simple test route to make sure the server is running
app.get('/', (req, res) => {
  res.send('Hello from the FitTrack Pro server!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: "Connection successful! Data is from the backend." });
});
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
