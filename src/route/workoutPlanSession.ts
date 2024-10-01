import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { addWorkoutSession } from "../controller/workoutPlanSession";
import { validateReqBody } from "../middleware/validator";
import { workoutSessionSchema } from "../schema/workoutSessionSchema";


const workoutPlanSessionRouter = Router();

workoutPlanSessionRouter.post(
  "/:id",
  authenticate,
  authorize("workouts.post"),
  validateReqBody(workoutSessionSchema),
  addWorkoutSession,
);


export default workoutPlanSessionRouter;
