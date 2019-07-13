const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    itemId: {type: String, required: true},
    userId: {type: String, required: true},

});

wishlistSchema.index({itemId: 1, userId: 1}, {unique: true});

module.exports = mongoose.model('Wishlist', wishlistSchema);