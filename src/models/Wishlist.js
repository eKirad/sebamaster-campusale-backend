const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },

});

wishlistSchema.index({item: 1, user: 1}, {unique: true});

module.exports = mongoose.model('Wishlist', wishlistSchema);