const Joi = require('joi');

const updateMeSchema = Joi.object({
  review: Joi.string()
    .required()
    .max(100),
  
  rating: Joi.number()
    .min(1)
    .max(5),
  
  author: Joi.string()
    .required(),
  
  tour: Joi.string()
    .required()

});

module.exports = updateMeSchema;