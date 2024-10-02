import Joi from 'joi';

const createWorkoutLogSchema = Joi.object({
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
