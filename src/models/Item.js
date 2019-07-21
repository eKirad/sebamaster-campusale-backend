const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    categoryId: {type: String, required: true},
    partnerId: {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: mongoose.Schema.Types.ObjectId, ref: 'Discount'},
    uri: {type: String}, // has to be made required: true
    imagePath: {type: String},
    description: {type :String}
});

module.exports = mongoose.model('Item', itemSchema);