const Joi = require('joi');

const schema = Joi.object({
  firstname: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters long',
    'string.max': 'First name must be less than 50 characters long',
  }),
  lastname: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters long',
    'string.max': 'Last name must be less than 50 characters long',
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.empty': 'Username is required',
    'string.alphanum': 'Username must only contain letters and numbers',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must be less than 30 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must be less than 30 characters long',
  }),
  article: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must be less than 100 characters long',
    }),
    content: Joi.string().min(10).required().messages({
      'string.empty': 'Content is required',
      'string.min': 'Content must be at least 10 characters long',
    }),
  }).required().messages({
    'object.base': 'Article must be an object',
    'any.required': 'Article is required',
  }),
});

module.exports = schema;
