const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const RatingController = require('../controllers/ratingController')

router.post('/', authMiddleware, RatingController.rate);
router.get('/:deviceId', authMiddleware, RatingController.getOne)

module.exports = router