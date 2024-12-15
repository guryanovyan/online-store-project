const {Device, Rating} = require('../models/models')
const ApiError = require('../error/ApiError');

class RatingController {
    async rate(req, res, next) {
        try {
            let {deviceId, userRating} = req.body;
            if(!deviceId || !userRating) {
                return next(ApiError.badRequest('Incorrect deviceId or userRating'))
            }

            const device = await Device.findByPk(deviceId);
            if(!device) {
                return next(ApiError.badRequest('Device does not exist'))
            }

            const userId = req.user.id;
            const existingRating = await Rating.findOne({where: {deviceId, userId}});
            if(existingRating) {
                return next(ApiError.badRequest('Cannot rate twice'))
            }

            userRating = Number(userRating);
            if(userRating < 1 || userRating > 5) {
                return next(ApiError.badRequest('Incorrect userRating'))
            }

            let newRating = 0;
            if(device.rating) {
                const ratings = await Rating.findAll({where: {deviceId}});
                let prevRatings = 0;
                ratings.forEach((r => {
                    prevRatings += r.rate;
                }))
                newRating = ((prevRatings + userRating) / (ratings.length + 1)).toFixed(1);
            }

            const rating = await Rating.create({
                userId: userId,
                deviceId: deviceId,
                rate: userRating
            })

            device.rating = newRating || userRating;
            await device.save();

            return res.json(device);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {deviceId} = req.params;
            const userId = req.user.id;

            const rating = await Rating.findOne({where: {userId, deviceId}});
            return res.json(rating)

        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new RatingController;