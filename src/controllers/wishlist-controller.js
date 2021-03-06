const Wishlist = require('../models/Wishlist');
const userService = require('../services/user-service');

module.exports = {
    getWishlist: (req, res) => {
        const user = userService.getUser(req.headers.authorization);

            if (req.query.itemId) {
                // Checking if a specific item exists in the user's wishlist
                Wishlist
                    .find({user: user.id, item: req.query.itemId})
                    .then((wishlist) => {
                        res.status(200).json(wishlist);
                    })
            } else {
                // Listing all of the user's wishlist
                Wishlist
                    .find({user: user.id}).populate({
                    path: 'item',
                    populate: {
                        path: 'discount',
                        model: 'Discount'
                    }
                })
                    .then((wishlist) => {
                        res.status(200).json(wishlist);
                    })
            }
    },
    addItemToWishlist: (req, res) => {
        const user = userService.getUser(req.headers.authorization);
        const wishlistItem = {
            user: user.id,
            item: req.body.itemId,
        };

            Wishlist
                .create(wishlistItem)
                .then((newItem) => {
                    return res.status(200).json(newItem)
                })
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
    removeItemFromWishlist: (req, res) => {
        const user = userService.getUser(req.headers.authorization);
        Wishlist.deleteOne({user: user.id, item: req.query.itemId})
            .then(() => res.status(200).json({
                message: `Wishlist item with id = ${req.query.itemId} was deleted from the user ${user.id}.`
            }))
            .catch(error => res.status(500).json({
                error: `Internal server error`,
                message: error.message
            }));
    }
}