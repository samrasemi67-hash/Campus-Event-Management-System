const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// --- REST API: GET all events ---
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

// --- REST API: POST a new event ---
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
            id: this.lastID
        });
    });
});

// --- REST API: Register for an event ---
app.post('/api/register', (req, res) => {
    const { user_id, event_id } = req.body;
    const registration_date = new Date().toISOString();
    const query = `INSERT INTO registrations (user_id, event_id, registration_date) VALUES (?, ?, ?)`;
    
    db.run(query, [user_id, event_id, registration_date], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "Successfully registered for event",
            registration_id: this.lastID
        });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});