const wishlistController = require('../controllers/wishlist-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.get(`${api}/wishlist/get`, middleware.checkAuthentication, wishlistController.getWishlist);
    app.post(`${api}/wishlist/add`, middleware.checkAuthentication, wishlistController.addItemToWishlist);
    app.delete(`${api}/wishlist/delete`, middleware.checkAuthentication, wishlistController.removeItemFromWishlist);
}

