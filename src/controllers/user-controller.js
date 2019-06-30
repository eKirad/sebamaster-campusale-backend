const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const User = require('../models/User');

module.exports = {
    login: (req, res) => {
        console.log(req.body);
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
                // Check if the password is valid
                console.log(`user.name = ${user.password}, req.body.password = ${req.body.password}`)
                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
                console.log(isPasswordValid);
                if (!isPasswordValid) {
                    console.log('no, it is not valid')
                    return res.status(401)
                        .send({
                            token: null
                        })
                }

                // User found & password is valid --> create a token
                const token = jwt.sign({
                    id: user._id,
                    username: user.username
                }, config.jwtSecret, {
                    expiresIn: 86400 
                });

                console.log(`token = ${token}`)

                res.status(200).json({ token: token });
            })
            .catch(error => res.status(404).json({
                error: 'User not found',
                message: error.message
            }));
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
    
        const user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        }
        
        console.log(user);

        User.create(user)
            .then((user) => {
                // If user is registered without errors --> create a token for that user
                const token = jwt.sign({
                    id: user._id,
                    username: user.username
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
    }
}
