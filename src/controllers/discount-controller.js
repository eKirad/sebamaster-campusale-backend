const Discount = require('../models/Discount');
const userService = require('../services/userService');

module.exports = {
    addDiscount: (req, res) => {
        Discount
            .create(req.body)
            .then((discount) => {
                return res.status(200).json(discount);
            })
            .catch((error) => {
                if (error.code === 1100) {
                    res.status(400).json({
                        error: 'Item exists',
                        message: error.message
                    });
                } else {
                    res.status(500).json({
                        error: 'Internal server error',
                        message: error.message
                    });
                }
            });
    },
        getDiscounts: (req, res) => {
        const partnerId = userService
            .getUser(req.headers.authorization)
            .partnerId;
        
        Discount
            .find({partnerId: partnerId})
            .then((discounts) => {
                return res.status(200).json((discounts));
            })
            .catch((error) => {

            });
    },
    deleteDiscount: (req, res) => {
        Discount
            .findByIdAndRemove(req.params.id)
            .then(() => res.status(200).json({
                message: `Discount with id = ${req.params.id} was deleted.`
            }))
            .catch(error => res.status(500).json({
                error: `Internal server error`,
                message: error.message
            }));
    }
}