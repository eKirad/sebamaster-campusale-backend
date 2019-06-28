const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');

module.exports = app => {
    app.get('/items', itemController.getAllItems);
    app.get(`/item/:id`, itemController.getItem);
}
