const express = require('express');
const userController = require('../controllers/user-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api)  => {
    app.get(`${api}/user/:id`, userController.getUser);
    app.post(`${api}/login`, userController.login);
    app.post(`${api}/signup`, userController.signup);
    app.post(`${api}/logout`, middleware.checkAuthentication, userController.logout);

    // Update user
    app.put(`${api}/users`, 
        middleware.checkAuthentication, 
        userController.updateUser);
    
    // Routes that require admin authorization
    app.post(`${api}/signup-partner`, 
        middleware.checkAuthentication,
        middleware.isAdmin,
        userController.signupPartnerUser);
    app.delete(`${api}/delete-partner`,
        middleware.checkAuthentication,
        middleware.isAdmin,
        userController.deletePartnerUser)
}
