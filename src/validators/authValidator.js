const Joi = require('joi');

const authSchemas = {
  register: Joi.object({
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
    password: Joi.string().min(6).max(255).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    }),
    age: Joi.number().integer().min(1).max(150).required().messages({
      'number.base': 'Age must be a number',
      'number.min': 'Age must be at least 1',
      'number.max': 'Age must be less than 150',
      'any.required': 'Age is required'
    })
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be valid',
      'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
  }),

  refreshToken: Joi.object({
    refreshToken: Joi.string().required().messages({
      'string.empty': 'Refresh token is required',
      'any.required': 'Refresh token is required'
    })
  })
};

module.exports = authSchemas;