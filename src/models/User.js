const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    location: { type: String },
    gender: { type: String },
    dateOfBirth: { type: String }
});

module.exports = mongoose.model('User', userSchema);