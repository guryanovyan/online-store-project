const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create ) // Create brand
router.get('/', brandController.getAll) // Get all brands

module.exports = router