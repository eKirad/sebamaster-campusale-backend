const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const User = require('../models/User');
const Wishlist = require('../models/Wishlist');

module.exports = {
    login: (req, res) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) {
            return res.status(400)
                .json({
                    error: 'Bad Request',
                    message: 'The request body must contain a password property'
                });
        }

        if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) {
            return res.status(400)
                .json({
                    error: 'Bad Request',
                    message: 'The request body must contain a username property'
                });
        }

        User
            .findOne({ username: req.body.username })
            .exec()
            .then(user => {
                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
                // Check if the password is valid
                if (!isPasswordValid) {
                    return res.status(401)
                        .send({
                            token: null
                        })
                }

                // User found & password is valid --> create a token
                const token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    partnerId: user.partnerId
                }, config.developement.jwtSecret, {
                    expiresIn: 86400 
                });

                res.status(200).json({ token: token });
            })
            .catch(error => res.status(404).json({
                error: 'User not found',
                message: error.message
            }));
    },
    logout: (req, res) => {
        res.status(200).send({ token: null });
    },
    signup: (req, res) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'password')){
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The request body must contain a password property'
            });
        } 

        if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The request body must contain a username property'
            });
        }

        if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The request body must contain an email property'
            });
        }
    
        const user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email,
            role: req.body.role
        }
        
        User.create(user)
            .then((user) => {
                // If user is registered without errors --> create a token for that user
                
                
                const token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    role: user.role
                }, config.developement.jwtSecret, {
                    expiresIn: 86400
                });

                res.status(200).json({ token })
            })
            .catch((error) => {
                if (error.code === 11000) {
                    res.status(400).json({
                        error: 'User exists',
                        message: error.message
                    })
                } else {
                    res.status(500).json({
                        error: 'Internal server error',
                        message: error.message
                    });
                }
            });
    },
    signupPartnerUser: (req, res) => {
        const user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email,
            role: req.body.role,
            partnerId: req.body.partnerId
        }
        
        User.create(user)
            .then((user) => {
                // Register the user.
                res.status(200).json({ user })
            })
            .catch((error) => {
                if (error.code === 11000) {
                    res.status(400).json({
                        error: 'User exists',
                        message: error.message
                    })
                } else {
                    res.status(500).json({
                        error: 'Internal server error',
                        message: error.message
                    });
                }
            });
    },
    deletePartnerUser: (req, res) => {

    },
    getUser: (req, res) => {
        User
            .findById(req.params.id)
            .then((user) => {
                res.status(200).json(user)
            })
    },
    updateUser: (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The request body is empty'
            });
        }

        User
            .findByIdAndUpdate(req.body._id, {
                password: bcrypt.hashSync(req.body.password, 8),
                email: req.body.email,
                role: req.body.role,
                gender: req.body.gender,
                location: req.body.location,
                dateOfBirth: req.body.dateOfBirth
            })
            .then(user => res.status(200).json(user))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    }
}
