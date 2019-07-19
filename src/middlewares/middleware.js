const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userService = require('../services/user-service');

const checkAuthentication = (req, res, next) => {
    let token = ``;
    if (req.headers.authorization) {
        token = req.headers.authorization.substring(4);
    }
    
    if (!token) {
        return res.status(401)
            .send({
                error: `Unauthorized`,
                message: `No token provided in the request`
            })
    }

    jwt.verify(token, config.developement.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401)
                .send({
                    error: `Unauthorized`,
                    message: `No token provided in the request`
                })
        }

        req.userId = decoded.id;
        next();
    });
}

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    res.render('error', { error: err })
};

const isAdmin = (req, res, next) => {

    const userObj = userService.getUser(req.headers.authorization);

    if (userObj.role !== `admin`) {
        return res.status(401)
            .send({
                error: `Unauthorized`,
                message: `Permission denied. No admin rights`
            })
    } else {
        next();
    }
}

const isAdminOrPartner = (req, res, next) => {
    const userObj = userService.getUser(req.headers.authorization);

    if (userObj.role !== `admin` && userObj.role !== `partner`) {
        return res.status(401)
            .send({
                error: `Unauthorized`,
                message: `Permission denied. No admin rights`
            })
    } else {
        next();
    }
}

const isStudent = (req, res, next) => {
    const userObj = userService.getUser(req.headers.authorization);

    if (userObj.role !== `student`) {
        res.status(400).json({
            message: 'Admins and partners don\'t have wishlists.'
        });
    } else {
        next();
    }
}

module.exports = {
    checkAuthentication,
    isAdmin,
    isAdminOrPartner,
    isStudent,
    errorHandler
}