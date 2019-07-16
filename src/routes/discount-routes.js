const express = require('express');
const discountController = require('../controllers/discount-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.post(`${api}/discounts`, 
        middleware.checkAuthentication, 
        middleware.isAdminOrPartner,
        discountController.addDiscount);
    
    app.get(`${api}/discounts`, 
        middleware.checkAuthentication, 
        middleware.isAdminOrPartner,
        discountController.getDiscounts);
    
}