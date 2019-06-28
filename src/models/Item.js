const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    type: String,
    categoryId: Number,
    companyId: Number,
    itemName: { type: String, required: true },
    description: String,
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema);