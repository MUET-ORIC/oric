require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// ─── Connect to MongoDB ────────────────────────────────────────────
connectDB();

// ─── Middleware ─────────────────────────────────────────────────────
app.use(cors({
    origin: [
        process.env.CLIENT_URL || 'http://localhost:5173',
        process.env.VITE_API_URL,
        'https://oric-muet-scorecard.netlify.app'
    ],

    credentials: true,               // allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());             // parse cookies

// ─── Routes ────────────────────────────────────────────────────────
app.use('/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/submissionRoutes'));
app.use('/api', require('./routes/adminRoutes'));
app.use('/api', require('./routes/kpiRoutes'));

// ─── Health check ──────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ status: 'OK', message: 'ORIC KPI API' }));

// ─── Start server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});