const express = require('express');
const cors = require('cors');
const db = require('./database/database'); // Adjust path if needed

const app = express();
const PORT = process.source || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send("Backend server is running successfully!");
});

// Get all events
app.get('/api/events', (req, res) => {
    const query = `SELECT * FROM events`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// Create an event
app.post('/api/events', (req, res) => {
    const { title, description, date, time, location, category, capacity } = req.body;
    const query = `INSERT INTO events (title, description, date, time, location, category, capacity) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [title, description, date, time, location, category, capacity];

    db.run(query, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: { id: this.lastID, ...req.body }
        });
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});