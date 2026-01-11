const Joi = require('joi');

const userSchemas = {
  create: Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be valid',
      'any.required': 'Email is required'
    }),
    age: Joi.number().integer().min(1).max(150).required().messages({
      'number.base': 'Age must be a number',
      'number.min': 'Age must be at least 1',
      'number.max': 'Age must be less than 150',
      'any.required': 'Age is required'
    })
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(255).optional(),
    email: Joi.string().email().optional(),
    age: Joi.number().integer().min(1).max(150).optional()
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  }),

  id: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'ID must be a number',
      'number.positive': 'ID must be positive',
      'any.required': 'ID is required'
    })
  })
};

module.exports = userSchemas;