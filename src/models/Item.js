const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    categoryId: {type: String, required: true},
    partnerId: {type: String, required: true},
    oldPrice: {type: Number, required: true},
    newPrice: {type: Number, required: true},
    // image: {},
    type: {type: String},
    description: {type :String},
    discountPercentage: {type:Number}
});

module.exports = mongoose.model('Item', itemSchema);