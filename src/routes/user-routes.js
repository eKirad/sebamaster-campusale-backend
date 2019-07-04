const express = require('express');
const userController = require('../controllers/user-controller');
const userMiddleware = require('../middlewares/user-middleware');

module.exports = (app, api)  => {
    app.get(`${api}/user/:id`, userController.getUser);
    app.post(`${api}/login`, userController.login);
    app.post(`${api}/signup`, userController.signup);
    app.post(`${api}/logout`, userMiddleware.checkAuthentication, userController.logout);
}
