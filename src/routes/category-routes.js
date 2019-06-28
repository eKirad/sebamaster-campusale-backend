const express = require('express');
const categoryController = require('../controllers/category-controller');

module.exports = (app) => {
    app.get('/categories', categoryController.getAllCategories)
}