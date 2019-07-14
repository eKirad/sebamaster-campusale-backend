const Discount = require('../models/Discount');
const userService = require('../services/userService');

module.exports = {
    addDiscount: (req, res) => {
        console.log(req.body);
        Discount
            .create(req.body)
            .then((discount) => {
                console.log(discount);
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
                console.log(discounts)
                return res.status(200).json((discounts));
            })
            .catch((error) => {

            });
    }
}