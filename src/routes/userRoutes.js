const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validate, validateParams } = require('../middleware/validateRequest');
const userSchemas = require('../validators/userValidator');
const authMiddleware = require('../middleware/authMiddleware');

// Public route - create user (alternative to register)
router.post(
  '/',
  validate(userSchemas.create),
  userController.createUser
);

// Protected routes - require authentication
router.get(
  '/',
  authMiddleware,
  userController.getAllUsers
);

router.get(
  '/:id',
  authMiddleware,
  validateParams(userSchemas.id),
  userController.getUserById
);

router.put(
  '/:id',
  authMiddleware,
  validateParams(userSchemas.id),
  validate(userSchemas.update),
  userController.updateUser
);

router.delete(
  '/:id',
  authMiddleware,
  validateParams(userSchemas.id),
  userController.deleteUser
);

module.exports = router;