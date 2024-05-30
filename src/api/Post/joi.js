const Joi = require('joi');

module.exports={
   createPostSchema : Joi.object({
      title: Joi.string().required().messages({
        'any.required': 'Title is required'
      }),
      body: Joi.string().required().messages({
        'any.required': 'Body is required'
      }),
      location: Joi.object({
        latitude: Joi.number().required().messages({
          'any.required': 'Latitude is required'
        }),
        longitude: Joi.number().required().messages({
          'any.required': 'Longitude is required'
        })
      }).required().messages({
        'any.required': 'Location is required'
      })
    }),
    updatePostSchema : Joi.object({
        title: Joi.string().required().messages({
          'any.required': 'Title is required'
        }),
        body: Joi.string().required().messages({
          'any.required': 'Body is required'
        }),
        location: Joi.object({
          latitude: Joi.number().required().messages({
            'any.required': 'Latitude is required'
          }),
          longitude: Joi.number().required().messages({
            'any.required': 'Longitude is required'
          })
        }).required().messages({
          'any.required': 'Location is required'
        })
      }),
    
}