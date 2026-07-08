const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, enum: ['department', 'admin'], default: 'department' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);