const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

exports.register = async (req, res) => {
    const { username, password, department } = req.body;
    if (!username || !password || !department) {
        return res.status(400).json({ success: false, message: 'All fields required' });
    }

    try {
        const existing = await User.findOne({ username });
        if (existing) return res.status(409).json({ success: false, message: 'Username taken' });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashed, department });
        await user.save();

        res.status(201).json({ success: true, message: 'Registered', user: { username, department } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password, department } = req.body;
    if (!username || !password || !department) {
        return res.status(400).json({ success: false, message: 'All fields required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        if (user.department !== department) {
            return res.status(401).json({ success: false, message: 'Department mismatch' });
        }

        const token = jwt.sign(
            { username: user.username, department: user.department },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('🔑 Token created for:', user.username, 'dept:', user.department);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            success: true,
            user: { username: user.username, department: user.department },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
};

exports.me = (req, res) => {
    console.log('👤 /auth/me returning:', req.user);
    res.json({ success: true, user: req.user });
};