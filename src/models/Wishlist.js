const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    itemId: {type: String, required: true},
    userId: {type: String, required: true}
});

module.exports = mongoose.model('Wishlist', wishlistSchema);