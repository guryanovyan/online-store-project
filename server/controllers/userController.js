const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const {User, Cart} = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body;
            if (!email || !password) {
                return next(ApiError.badRequest('Incorrect email or password'));
            }
            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                return next(ApiError.badRequest('User with that email already exists'));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, role, password: hashPassword});
            const cart = await  Cart.create({userId: user.id});
            const token = generateJwt(user.id, user.email, user.role);

            return res.json({token});

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({where: {email}});
            if(!user) {
                return next(ApiError.badRequest('User not found'));
            }
            let comparePassword = bcrypt.compareSync(password, user.password);
            if(!comparePassword) {
                return next(ApiError.badRequest('Incorrect password'));
            }
            const token = generateJwt(user.id, user.email, user.role)

            return res.json({token});

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async checkAuth(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({token})
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async checkRole(req, res, next) {
        try {
            return res.json({role: req.user.role});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new UserController()