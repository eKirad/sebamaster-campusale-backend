const express = require('express');
const userController = require('../controllers/user-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api)  => {
    // Currently unused endpoint
    app.get(`${api}/user/:id`, userController.getUser);
    
    app.post(`${api}/login`, userController.login);
    
    app.post(`${api}/signup`, userController.signup);
    
    app.post(`${api}/logout`, middleware.checkAuthentication, userController.logout);

    app.post(`${api}/signup-partner`, 
        middleware.checkAuthentication,
        middleware.isAdmin,
        userController.signupPartnerUser);

    app.put(`${api}/users/:id`, 
        middleware.checkAuthentication, 
        userController.updateUser);
    
    app.delete(`${api}/delete-partner`,
        middleware.checkAuthentication,
        middleware.isAdmin,
        userController.deletePartnerUser)
}
