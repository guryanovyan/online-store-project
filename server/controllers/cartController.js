const {Cart, CartDevice, Device} = require('../models/models');
const ApiError = require('../error/ApiError')

class CartController {
    async add(req, res, next) {
        try{
            const {deviceId} = req.body;
            if(!deviceId) {
                return next(ApiError.badRequest('Incorrect deviceId'))
            }
            const userId = req.user.id;
            const cart = await Cart.findOne({where: {userId}});

            const cartDevice = await CartDevice.create({
                cartId: cart.id,
                deviceId: deviceId
            });
            return res.json(cartDevice);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try{
            const userId = req.user.id;
            const cart = await Cart.findOne({where: {userId}});
            const cartDevices = await CartDevice.findAll({
                where: {cartId: cart.id},
                include: [{model: Device}]
            });
            return res.json(cartDevices);

        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async remove(req, res, next) {
        try {
            const {deviceId} = req.body;
            if(!deviceId) {
                return next(ApiError.badRequest('Incorrect deviceId'))
            }

            const userId = req.user.id;
            const cart = await Cart.findOne({where: {userId}});

            const device = await CartDevice.findOne({
                where: {cartId: cart.id, deviceId}
            });
            if(!device) {
                return ApiError.badRequest('Device not found in the cart')
            }
            await device.destroy();

            const cartDevices = await CartDevice.findAll({
                where:{cartId: cart.id},
                include: [{model:Device}]
            })

            return res.json(cartDevices)

        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async updateQuantity(req, res, next) {
        try {
            const {deviceId, quantity} = req.body;
            console.log(deviceId, quantity)
            if(!deviceId) {
                return next(ApiError.badRequest('Incorrect deviceId'))
            }

            const userId = req.user.id;
            const cart = await Cart.findOne({where: {userId}});

            const device = await CartDevice.findOne({
                where: {cartId: cart.id, deviceId}
            });
            if(!device) {
                return ApiError.badRequest('Device not found in the cart')
            }
            await device.update({quantity})

            const cartDevices = await CartDevice.findAll({
                where:{cartId: cart.id},
                include: [{model:Device}]
            })

            return res.json(cartDevices)

        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new CartController;