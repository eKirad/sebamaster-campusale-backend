const Post = require('../models/Post');
const userService = require('../services/user-service');

module.exports = {
    addPost: (req, res) => {
        const currUser = userService.getUser(req.headers.authorization);
        let post = {
            discount: "",
            users : [currUser.id]
        }
        if (req.body) {
            post.discount = req.body.discount
        }
        Post
            .create(post)
            .then((bdp) => {
                Post.populate(bdp, {path:"discount"}, function(err, bdp) {return res.status(200).json(bdp);});
            })
            .catch((error) => {
                if (error.code === 1100) {
                    res.status(400).json({
                        error: 'Post exists',
                        message: error.message
                    });
                } else {
                    res.status(500).json({
                        error: 'Internal server error',
                        message: error.message
                    });
                }
            });
    },
    getPosts: (req, res) => {
        const currUser = userService.getUser(req.headers.authorization);
        Post
            .find().populate('discount')
            .then((discounts) => {
                return res.status(200).json((discounts));
            })
            .catch((error) => {

            });

    },
    deletePost: (req, res) => {
        Post
            .findByIdAndRemove(req.params.id)
            .then(() => res.status(200).json({
                message: `Post with id = ${req.params.id} was deleted.`
            }))
            .catch(error => res.status(500).json({
                error: `Internal server error`,
                message: error.message
            }));
    },
    joinPost: (req, res) => {
        const currUser = userService.getUser(req.headers.authorization);
        Post
            .findByIdAndUpdate(req.body.id, {$addToSet: {users: currUser._id}})
            .then(bdp => res.status(200).json(bdp))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    },
    leavePost: (req, res) => {
        const currUser = userService.getUser(req.headers.authorization);
        Post
            .findByIdAndUpdate(req.body.id, {$pull: {users: currUser._id }})
            .then(bdp => res.status(200).json(bdp))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    }
}