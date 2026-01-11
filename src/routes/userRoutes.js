const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validate, validateParams } = require('../middleware/validateRequest');
const userSchemas = require('../validators/userValidator');
// const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post(
  '/',
  validate(userSchemas.create),
  userController.createUser
);

router.get(
  '/',
  userController.getAllUsers
);

router.get(
  '/:id',
  validateParams(userSchemas.id),
  userController.getUserById
);

router.put(
  '/:id',
  validateParams(userSchemas.id),
  validate(userSchemas.update),
  userController.updateUser
);

router.delete(
  '/:id',
  validateParams(userSchemas.id),
  userController.deleteUser
);

// Protected routes example (uncomment authMiddleware when needed):
// router.put(
//   '/:id',
//   authMiddleware,
//   validateParams(userSchemas.id),
//   validate(userSchemas.update),
//   userController.updateUser
// );

module.exports = router;