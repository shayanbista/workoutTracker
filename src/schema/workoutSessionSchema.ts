import Joi from 'joi';

export const workoutSessionSchema = Joi.object({
  comments: Joi.string()
    .optional()
    .allow('')
    .max(255)
    .messages({
      'string.base': 'Comments must be a string.',
      'string.max': 'Comments must be less than or equal to 255 characters.',
    }),

  scheduledAt: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'Scheduled date must be a valid date.',
      'date.iso': 'Scheduled date must be in ISO format.',
      'any.required': 'Scheduled date is required.',
    }),
});


export const workoutSessionIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "Id must be a number",
    "any.required": "Id is required",
  }),
}).options({ stripUnknown: true });


