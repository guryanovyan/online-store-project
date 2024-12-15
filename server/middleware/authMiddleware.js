const verifyToken = require('../utils/verifyTokenUtil');
const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next();
    }
    try {
        const decoded = verifyToken(req, res);
        req.user = decoded;
        next();

    } catch (e) {
        next(ApiError.unauthorized('Not authorized!'));
    }
}