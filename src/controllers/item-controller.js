const Item = require('../models/Item');

module.exports = {
    getItem: (req, res) => {
        const itemId = req.params.id;
        Item
            .findById(itemId)
            .then((item) => {
                res.status(200).json(item)
            });
    },
    getAllItems: (req, res) => {
        Item
            .find({ })
            .then((items) => {
                // items.forEach(item => console.log(item.itemName));
                res.status(200).json(items)
            });
    }
}



