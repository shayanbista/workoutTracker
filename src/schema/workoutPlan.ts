import Joi from "joi";

export const createPlanBodySchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
  }).options({
    stripUnknown: true,
  });
  