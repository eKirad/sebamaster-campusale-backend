const jwt = require('jsonwebtoken');

// Gets authorization header. Parses JWT and returns user as JS object
const getUser = (authHeader) =>
{
    const token = authHeader.split(' ');
    return jwt.decode(token[1]);
}

module.exports = {
    getUser
}