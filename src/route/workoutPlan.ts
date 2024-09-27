import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { addWorkoutPlan, removeWorkoutPlan } from "../controller/workoutPlan";
import { createPlanBodySchema, workoutPlanIdSchema } from "../schema/workoutPlan";

const workoutPlanRouter = Router();
workoutPlanRouter.post("/", authenticate,authorize("workouts.post"),validateReqBody(createPlanBodySchema),addWorkoutPlan);
workoutPlanRouter.delete("/:id", authenticate,authorize("workouts.delete"),validateReqParams(workoutPlanIdSchema),removeWorkoutPlan);

export default workoutPlanRouter;
