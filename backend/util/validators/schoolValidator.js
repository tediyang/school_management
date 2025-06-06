const Joi = require('joi');

class SchoolValidator {
  AddSchool = Joi.object({
    name: Joi
      .string()
      .required()
      .messages({
        'string.base': 'name must be a string.',
        'string.empty': 'name is required.',
        'any.required': 'name is a required field.'
      }),
    address: Joi
      .string()
      .required()
      .messages({
        'string.base': 'address must be a string.',
        'string.empty': 'address is required.',
        'any.required': 'address is a required field.'
      }),
    latitude: Joi
      .number()
      .required()
      .precision(6)
      .min(-90)
      .max(90)
      .messages({
        'number.base': 'latitude must be a number.',
        'number.empty': 'latitude is required.',
        'any.required': 'latitude is a required field.',
        'number.min': 'latitude must be >= -90.',
        'number.max': 'latitude must be <= 90.',
      }),
    longitude: Joi
      .number()
      .required()
      .precision(6)
      .min(-180)
      .max(180)
      .messages({
        'number.base': 'longitude must be a number.',
        'number.empty': 'longitude is required.',
        'any.required': 'longitude is a required field.',
        'number.min': 'longitude must be >= -180.',
        'number.max': 'longitude must be <= 180.',
      }),
  });

  ListSchools = Joi.object({
    latitude: Joi
      .number()
      .required()
      .precision(6)
      .min(-90)
      .max(90)
      .messages({
        'number.base': 'latitude must be a number.',
        'number.empty': 'latitude is required.',
        'any.required': 'latitude is a required field.',
        'number.min': 'latitude must be >= -90.',
        'number.max': 'latitude must be <= 90.',
      }),
    longitude: Joi
      .number()
      .required()
      .precision(6)
      .min(-180)
      .max(180)
      .messages({
        'number.base': 'longitude must be a number.',
        'number.empty': 'longitude is required.',
        'any.required': 'longitude is a required field.',
        'number.min': 'longitude must be >= -180.',
        'number.max': 'longitude must be <= 180.'
      }),
  });
}

const schoolValidator = new SchoolValidator();

module.exports = schoolValidator;
