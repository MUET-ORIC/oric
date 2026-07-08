require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// ─── Connect to MongoDB ────────────────────────────────────────────
connectDB();

// ─── Middleware ─────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static files ──────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
});