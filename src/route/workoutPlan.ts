import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { addWorkoutPlan } from "../controller/workoutPlan";
import { createPlanBodySchema } from "../schema/workoutPlan";

const workoutPlanRouter = Router();
workoutPlanRouter.post("/", authenticate,authorize("workouts.post"),validateReqBody(createPlanBodySchema),addWorkoutPlan);

export default workoutPlanRouter;
