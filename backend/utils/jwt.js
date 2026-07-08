const jwt = require('jsonwebtoken');

module.exports.generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role, department: user.department },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};