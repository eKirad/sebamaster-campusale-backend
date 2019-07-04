const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String}
});

module.export = mongoose.model('Partner', partnerSchema);