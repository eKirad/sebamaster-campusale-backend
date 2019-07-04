const wishlistController = require('../controllers/wishlist-controller');
const userMiddleware = require('../middlewares/user-middleware');

module.exports = (app, api) => {
    // TODO
    app.get(`${api}/wishlist/:id`, userMiddleware.checkAuthentication, wishlistController.getWishlist);
}

