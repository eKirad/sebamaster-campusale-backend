const express = require('express');
const userController = require('../controllers/user-controller');
const userMiddleware = require('../middlewares/user-middleware');

module.exports = (app, api)  => {
    app.post(`${api}/login`, userController.login);
    app.post(`${api}/signup`, userController.signup);
}
