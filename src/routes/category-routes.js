const express = require('express');
const categoryController = require('../controllers/category-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.get(`${api}/categories`, categoryController.getAllCategories)
    app.post(`${api}/categories`, 
        middleware.checkAuthentication,
        middleware.isAdmin,
        categoryController.addCategory);
    app.delete(`${api}/categories/:id`, 
        middleware.checkAuthentication,
        middleware.isAdmin,
        categoryController.deleteCategory);
}