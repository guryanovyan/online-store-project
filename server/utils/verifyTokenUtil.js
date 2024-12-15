const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    if (!token) {
        next(ApiError.unauthorized('Not authorized'));
    }
    return jwt.verify(token, process.env.SECRET_KEY);
}