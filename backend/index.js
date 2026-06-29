require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { me } = require('./controllers/authController');
const authenticateToken = require('./middleware/auth');
const researchRoutes = require('./routes/researchRoutes');
const innovationRoutes = require('./routes/innovationRoutes');
const sustainabilityRoutes = require('./routes/sustainabilityRoutes');

const app = express();

// ─── MIDDLEWARE ──────────────────────────────────────────────────────────────
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://oricmuet-data-entry-automation-system.netlify.app',
    ],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ─── DATABASE ──────────────────────────────────────────────────────────────
connectDB();

// ─── ROUTES ────────────────────────────────────────────────────────────────
// 1. Auth routes (root level) – gives /register, /login, /logout
app.use(authRoutes);

// 2. Session check – matches frontend’s call to /auth/me
app.get('/auth/me', authenticateToken, me);

// 3. KPI submission routes
app.use('/submit/research', researchRoutes);
app.use('/submit/innovation', innovationRoutes);
app.use('/submit/sustainability', sustainabilityRoutes);

// ─── 404 HANDLER ──────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// ─── START ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log('📁 Data stored under ./data/');
});