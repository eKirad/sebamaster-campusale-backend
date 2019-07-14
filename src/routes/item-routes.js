const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.get(`${api}/items`, itemController.getAllItems);
    app.get(`${api}/items/:id`, itemController.getItem);

    // Only users with role `partner` or `admin` should be able to add item
    app.post(`${api}/item`, 
        middleware.checkAuthentication, 
        middleware.checkPartnerOrAdminRole,
        itemController.addItem);
}
