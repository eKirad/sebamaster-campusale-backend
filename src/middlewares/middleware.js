const jwt = require('jsonwebtoken');
const config = require('../config/config');

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

const checkAdminRole = (req, res, next) => {
    const token = req.headers.authorization
        .split(' ');
    const userObj = jwt.decode(token[1]);

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

module.exports = {
    checkAuthentication,
    checkAdminRole,
    errorHandler
}