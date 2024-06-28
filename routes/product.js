const express = require('express');
const productController = require('../controller/product');
//const { protect, admin } = require('../middlewares/authMiddleware'); // Adjust the path as necessary

const router = express.Router();

router
  .post('/', productController.createProduct) // Protected route
  .get('/', productController.getAllProducts)
  .get('/:id', productController.getProduct)
  .put('/:id',productController.replaceProduct) // Protected route
  .patch('/:id',  productController.updateProduct) // Protected route
  .delete('/:id',productController.deleteProduct); // Admin-only route

module.exports = router;

/*
.post('/', protect, productController.createProduct) // Protected route
  .get('/', productController.getAllProducts)
  .get('/:id', productController.getProduct)
  .put('/:id', protect, productController.replaceProduct) // Protected route
  .patch('/:id', protect, productController.updateProduct) // Protected route
  .delete('/:id', protect, admin, productController.deleteProduct); // Admin-only route*/
