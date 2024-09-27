import Joi from "joi";

export const createPlanBodySchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
  }).options({
    stripUnknown: true,
  });

export const workoutPlanIdSchema = Joi.object({
    id: Joi.number().required().messages({
      "number.base": "Id must be a number",
      "any.required": "Id is required",
    }),
  }).options({ stripUnknown: true });
  