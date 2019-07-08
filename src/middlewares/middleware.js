const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');

const checkAuthentication = (req, res, next) => {
    console.log(`This is the request inside checkAuthenticationb`);
    console.log(req.headers)
    
    let token = ``;
    if (req.headers.authorization) {
        token = req.headers.authorization.substring(4);
    }

    if (!token) {
        console.log(`No token`)
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
    console.log(`inside CHeckAdminRole`);
    console.log(req);
    console.log(`AFTER`);
    const token = req.headers.authorization
        .split(' ');
    const myObj = jwt.decode(token[1]);
    console.log(myObj)
    if (myObj.role !== `admin`) {
        return res.status(401)
            .send({
                error: `Unauthorized`,
                message: `Permission denied. No admin rights`
            })
    } else {
        console.log(`yes, move on`)
        next();
    }
}

module.exports = {
    checkAuthentication,
    checkAdminRole,
    errorHandler
}