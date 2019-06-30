const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    // userEmail: { type: String ,required: true },
    // location: { type: String },
    // gender: { tpye: String }
});

module.exports = mongoose.model('User', userSchema);