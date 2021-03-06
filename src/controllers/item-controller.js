const Item = require('../models/Item');
const userService = require('../services/user-service');
const fs = require('fs');


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
        let item = req.body;
        item.imagePath = req.file.filename;
        Item
            .create(req.body)
            .then((newItem) => {
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
    getItemImage: (req, res) => {
        fs.readFile('public/uploads/'+req.params.filename, (err,contents)=> {
            res.writeHead(200, {'Content-Type': 'image/png' });
            res.end(contents, 'binary');
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

