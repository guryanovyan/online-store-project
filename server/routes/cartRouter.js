const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const CartController = require('../controllers/cartController')

router.post('/', authMiddleware, CartController.add) // Add device to the cart
router.get('/', authMiddleware, CartController.getAll) // Show devices in the cart
router.delete('/', authMiddleware, CartController.remove) // Remove device from the cart
router.put('/', authMiddleware, CartController.updateQuantity) // Remove device from the cart

module.exports = router