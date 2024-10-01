import Joi from "joi";

export const createWorkoutPlanExerciseSchema = Joi.object({
  sets: Joi.number().integer().min(1).required().messages({
    "number.base": "Sets must be a number",
    "number.min": "Sets must be at least 1",
    "any.required": "Sets are required",
  }),
  reps: Joi.number().integer().min(1).required().messages({
    "number.base": "Reps must be a number",
    "number.min": "Reps must be at least 1",
    "any.required": "Reps are required",
  }),
  weight: Joi.number().positive().required().messages({
    "number.base": "Weight must be a number",
    "number.positive": "Weight must be a positive number",
    "any.required": "Weight is required",
  }),
  workoutPlanId: Joi.number().integer().required().messages({
    "number.base": "Workout Plan ID must be a number",
    "any.required": "Workout Plan ID is required",
  }),
  exerciseId: Joi.number().integer().required().messages({
    "number.base": "Exercise ID must be a number",
    "any.required": "Exercise ID is required",
  }),
});

export const updateWorkoutPlanExerciseSchema = Joi.object({
  workoutPlanId: Joi.number().integer().required(),
  exerciseId: Joi.number().integer().required(),
  sets: Joi.number().integer().min(1).required(),
  weight: Joi.number().integer().min(1).required(),
  reps: Joi.number().integer().min(1).required(),
  updatedSets: Joi.number().integer().min(1).optional(),
  updatedReps: Joi.number().integer().min(1).optional(),
});

