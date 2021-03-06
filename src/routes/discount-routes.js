const express = require('express');
const discountController = require('../controllers/discount-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.get(`${api}/discounts`, 
        middleware.checkAuthentication, 
        middleware.isAdminOrPartner,
        discountController.getDiscounts);

    app.get(`${api}/discounts/bulk`,
        middleware.checkAuthentication,
        discountController.getBulkDiscounts);

    app.post(`${api}/discounts`, 
        middleware.checkAuthentication, 
        middleware.isAdminOrPartner,
        discountController.addDiscount);

    app.delete(`${api}/discounts/:id`, 
        middleware.checkAuthentication, 
        middleware.isAdminOrPartner,
        discountController.deleteDiscount);

    // Currently unused endpoint
    app.put(`${api}/discounts`, 
        middleware.checkAuthentication, 
        middleware.isAdminOrPartner,
        discountController.updateDiscount);
}