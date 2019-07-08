const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    isApproved: { type: Boolean, required: true },
    location: {type: String}
});

module.exports = mongoose.model('Partner', partnerSchema);