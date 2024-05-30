const Joi = require('joi');

module.exports={
    registerJoi : Joi.object({
        name: Joi.string().required().messages({
          'string.empty': 'Name is required',
          'any.required': 'Name is required'
        }),
        email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
          'string.email': 'Email must be a valid email address',
          'string.empty': 'Email is required',
          'any.required': 'Email is required'
        }),
        password: Joi.string().required().messages({
           'string.empty': 'Password is required',
          'any.required': 'Password is required'
        })
    }),
    loginJoi : Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
          'string.email': 'Email must be a valid email address',
          'string.empty': 'Email is required',
          'any.required': 'Email is required'
        }),
        password: Joi.string().required().messages({
          'string.empty': 'Password is required',
          'any.required': 'Password is required'
        })
    }),
    
}