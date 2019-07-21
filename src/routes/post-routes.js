const express = require('express');
const postController = require('../controllers/post-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.post(`${api}/posts/add`,
        middleware.checkAuthentication,
        postController.addPost);
    app.get(`${api}/posts/get`,
        middleware.checkAuthentication,
        postController.getPosts);
    app.put(`${api}/posts/join`,
        middleware.checkAuthentication,
        postController.joinPost);
    app.put(`${api}/posts/leave`,
        middleware.checkAuthentication,
        postController.leavePost);
    app.delete(`${api}/posts/delete/:id`,
        middleware.checkAuthentication,
        postController.deletePost);
}