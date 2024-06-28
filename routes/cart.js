const express = require('express');
const { addToCart, updateCartItem, removeCartItem, getUserCart } = require('../controller/cart');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/add', protect, addToCart);
router.put('/update', protect, updateCartItem);
router.delete('/remove', protect, removeCartItem);
router.get('/cart', protect, getUserCart);

module.exports = router;  
