const express = require('express');

const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect('your_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Add any other connection options as needed
});

const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory storage for ratings
const ratings = {};

app.use(bodyParser.json());

// Serve the HTML, CSS, and JS files
app.use(express.static('public'));

const gamesRouter = require('./api/games/games');

app.use('/api/games', gamesRouter);


// Endpoint to get all ratings
app.get('/api/ratings', (req, res) => {
  res.json(ratings);
});

// Endpoint to update a rating
app.post('/api/ratings', (req, res) => {
  const { gameId, gamerId, rating } = req.body;

  if (!ratings[gameId]) {
    ratings[gameId] = {};
  }

  ratings[gameId][gamerId] = rating;

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
