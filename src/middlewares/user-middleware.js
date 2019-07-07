const jwt = require('jsonwebtoken');
const config = require('../config/config');


const checkAuthentication = (req, res, next) => {
    let token = ``;
    // console.log(req.headers)
    if (req.headers.authorization) {
        console.log(`yes`)
        token = req.headers.authorization.substring(4);
    }

    if (!token) {
        return res.status(401)
            .send({
                error: `Unauthorized`,
                message: `No token provided in the request`
            })
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
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

module.exports = {
    checkAuthentication,
    errorHandler
}