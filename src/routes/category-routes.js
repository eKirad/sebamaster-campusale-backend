const express = require('express');
const categoryController = require('../controllers/category-controller');

module.exports = (app, api) => {
    app.get(`${api}/categories`, categoryController.getAllCategories)
}