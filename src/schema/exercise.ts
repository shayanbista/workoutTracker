import Joi from "joi";

export const getExerciseQuerySchema = Joi.object({
  q: Joi.string().optional(),
  page: Joi.number()
    .min(1)
    .optional()
    .messages({
      "number.base": "Page must be a number",
      "number.min": "Page must be at least 1",
    })
    .default(1),

  size: Joi.number()
    .min(1)
    .max(10)
    .optional()
    .messages({
      "number.base": "Size must be a number",
      "number.min": "Size must be at least 1",
      "number.max": "Size must be at most 10",
    })
    .default(10),
}).options({ stripUnknown: true });

export const createExerciseBodySchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty",
    }),
    
    description: Joi.string().required().messages({
      "any.required": "Description is required",
      "string.empty": "Description cannot be empty",
    }),
    
    type: Joi.string().valid('Indoor Game', 'Outdoor Game', 'Fitness', 'Martial Arts', 'Team Sport', 'Individual Sport')
      .required()
      .messages({
        "any.required": "Type is required",
        "string.empty": "Type cannot be empty",
        "any.only": "Type must be one of the following: Indoor Game, Outdoor Game, Fitness, Martial Arts, Team Sport, Individual Sport",
      }),
  }).options({
    stripUnknown: true,
  });

