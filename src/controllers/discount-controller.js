const Discount = require('../models/Discount');
const userService = require('../services/user-service');

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
    getBulkDiscounts: (req, res) => {

        Discount
            .find({bulkAmount: {$ne: null}})
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
    },
    updateDiscount: (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The request body is empty'
            });
        }
        Discount
            .findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                amountInPercentage: req.body.amountInPercentage,
                bulkAmount: req.body.bulkAmount
            }, {new: true})
            .then(discount => {
                res.status(200).json(discount)
            })
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    }
}