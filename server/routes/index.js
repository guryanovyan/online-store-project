const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter')
const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const cartRouter = require('./cartRouter')
const ratingRouter = require('./ratingRouter')

router.use('/user', userRouter)
router.use('/device', deviceRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/cart', cartRouter)
router.use('/rating', ratingRouter)

module.exports = router