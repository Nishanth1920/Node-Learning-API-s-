const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validateRequest');
const authSchemas = require('../validators/authValidator');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post(
  '/register',
  validate(authSchemas.register),
  authController.register
);

router.post(
  '/login',
  validate(authSchemas.login),
  authController.login
);

router.post(
  '/refresh-token',
  validate(authSchemas.refreshToken),
  authController.refreshToken
);

router.post(
  '/logout',
  authController.logout
);

// Protected routes
router.post(
  '/logout-all',
  authMiddleware,
  authController.logoutAll
);

router.get(
  '/profile',
  authMiddleware,
  authController.getProfile
);

module.exports = router;