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
    },
    addItem: (req, res) => {
        Item
            .create(req.body)
            .then((newItem) => res.status(200).json(newItem))
            .catch((error) => {
                if (error.code === 11000) {
                    res.status(400).json({
                        error: 'Item exists',
                        message: error.message
                    })
                } else {
                    res.status(500).json({
                        error: 'Internal server error',
                        message: error.message
                    });
                }
            });
    }
}



