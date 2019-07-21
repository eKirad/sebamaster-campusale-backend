const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    discount: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Discount',
        required:true
    },
    users : [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);