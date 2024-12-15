const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), deviceController.create) // Create device
router.get('/', deviceController.getAll) // Get all devices
router.get('/:id', deviceController.getOne) // Get one device

module.exports = router