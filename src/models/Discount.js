const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    partnerId: {type: String, required: true},
    description: {type: String},
    // amount: {type: Number}
    // validFrom: {type: Date},
    // validUntil: {type: Date},
});

module.exports = mongoose.model('Discount', discountSchema);