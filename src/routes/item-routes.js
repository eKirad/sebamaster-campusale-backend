const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');

module.exports = (app, api) => {
    app.get(`${api}/items`, itemController.getAllItems);
    app.get(`${api}/item/:id`, itemController.getItem);
}
