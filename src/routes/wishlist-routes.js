const wishlistController = require('../controllers/wishlist-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.get(`${api}/wishlist/get`, 
        middleware.checkAuthentication, 
        middleware.isStudent,
        wishlistController.getWishlist);
    app.post(`${api}/wishlist/add`, 
        middleware.checkAuthentication, 
        middleware.isStudent,
        wishlistController.addItemToWishlist);
    // Why don't we check if the user is a student?
    app.delete(`${api}/wishlist/delete`, 
        middleware.checkAuthentication,
        wishlistController.removeItemFromWishlist);
}

