const express = require('express');
const userController = require('../controllers/user-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api)  => {
    app.get(`${api}/user/:id`, userController.getUser);
    app.post(`${api}/login`, userController.login);
    app.post(`${api}/signup`, userController.signup);
    // Register new user as partner, done only by admin
    app.post(`${api}/signup-partner`, 
        middleware.checkAuthentication,
        middleware.checkAdminRole,
        userController.signupPartnerUser);
    app.post(`${api}/logout`, middleware.checkAuthentication, userController.logout);
}
