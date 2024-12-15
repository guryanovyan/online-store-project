const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.checkAuth) // Check if user is authorized via JWT
router.get('/auth/role', checkRole('ADMIN'), userController.checkRole) // Check if user is ADMIN via JWT

module.exports = router