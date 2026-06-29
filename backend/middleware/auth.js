const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('🔍 Decoded token:', decoded); // debug
        const now = Math.floor(Date.now() / 1000);
        if (now - decoded.iat > 3 * 60 * 60) {
            res.clearCookie('token');
            return res.status(401).json({ success: false, message: 'Session expired' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = authenticateToken;