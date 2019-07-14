const Item = require('../models/Item');
const userService = require('../services/userService');

module.exports = {
    getItem: (req, res) => {
        const itemId = req.params.id;
        Item
            .findById(itemId)
            .populate(`discount`)
            .then((item) => {
                res.status(200).json(item)
            });
    },
    getAllItems: (req, res) => {
        Item
            .find({ })
            .populate(`discount`)
            .then((items) => res.status(200).json(items));
    },
    addItem: (req, res) => {
        Item
            .create(req.body)
            .then((newItem) => {
                console.log(newItem)
                return res.status(200).json(newItem)})
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
    },
    getPartnerItems: (req, res) => {
        const partnerId = userService
            .getUser(req.headers.authorization)
            .partnerId;
        Item
            .find({partnerId: partnerId})
            .populate(`discount`)
            .then((items) => res.status(200).json(items))
    },
    updateItem: (req, res) => {
        console.log(`Inside updateItem`);
        // console.log(req.body)
        console.log(req.body.itemId)
        console.log(req.body.discountId)
        
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The request body is empty'
            });
        }

        Item
            .findByIdAndUpdate(req.body.itemId, {discount: req.body.discountId})
            .then(item => res.status(200).json(item))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    }
}

