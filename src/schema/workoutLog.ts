import Joi from 'joi';

const createWorkoutLogSchema = Joi.object({
  userId: Joi.number()
    .integer()
    .positive()
    .required(),
  workoutPlanId: Joi.number()
    .integer()
    .positive()
    .required(),
  notes: Joi.string()
    .allow('', null)
    .optional(),
  completed: Joi.boolean()
    .required(),
  logDate: Joi.date()
    .iso() 
    .required(),
});

export default createWorkoutLogSchema;
