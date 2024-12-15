const verifyToken = require('../utils/verifyTokenUtil')
const ApiError = require("../error/ApiError");

module.exports = function (role) {
    return function (req, res, next) {
        if(req.method === 'OPTIONS') {
            next();
        }
        try {
            const decoded = verifyToken(req, res);
            if (decoded.role !== role) {
                console.log(`Access denied: Required role ${role}, user role ${decoded.role}`);
                return next(ApiError.forbidden('No permission'));
            }
            req.user = decoded;
            next();

        } catch (e) {
            next(ApiError.unauthorized('Not authorized'));
        }
    }
}