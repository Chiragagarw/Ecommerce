const express = require('express');
const userController = require('../controller/user');
const { protect, admin } = require('../middlewares/authMiddleware');
//const User = require('../model/user');
const router = express.Router();

router
  .post('/signUp', userController.createUser)
  .post('/login', userController.login)

  .get('/', userController.getAllUser)
  .get('/:id', protect, userController.getUser) // Protected route
  .put('/:id', protect, userController.replaceUser) // Protected route
  .delete('/:id', protect, userController.deleteUser) // Admin-only route
  .patch('/:id', protect, userController.updateUser); // Protected route

  module.exports = router;