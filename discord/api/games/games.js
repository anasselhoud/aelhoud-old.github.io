// games.js

const express = require('express');
const router = express.Router();

// Sample data to simulate server-side storage
let gameData = [
    { name: 'Game 1', ssouf: 'Action', zed: '2023-01-01', dib: 'USA', chamha: 'hh', taiha: "hh", nasio: "hh", status:"0" },
    { name: 'Game 1', ssouf: 'Action', zed: '2023-01-01', dib: 'USA', chamha: 'hh', taiha: "hh", nasio: "hh", status:"0" },
    { name: 'Game 1', ssouf: 'Action', zed: '2023-01-01', dib: 'USA', chamha: 'hh', taiha: "hh", nasio: "hh", status:"0" },
    { name: 'Game 1', ssouf: 'Action', zed: '2023-01-01', dib: 'USA', chamha: 'hh', taiha: "hh", nasio: "hh", status:"0" },
    // Add more sample data as needed
];

// GET endpoint for fetching game data
router.get('/', (req, res) => {
    res.json(gameData);
    console.log(gameData);
});

// POST endpoint for saving game data
// POST endpoint for saving game data
router.post('/', express.json(), (req, res) => {
    const newData = req.body;

    // Update existing elements in gameData array
    newData.forEach((item, index) => {
        if (gameData[index]) {
            gameData[index] = item;
            console.log(item)
        } else {
            // If the index is beyond the current length, push the new item
            gameData.push(item);
        }
    });

    res.json({ message: 'Data updated successfully' });
});


module.exports = router;
