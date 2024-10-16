import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import {
  addWorkoutSession,
  removeWorkoutSession,
  updateWorkoutSession,
} from "../controller/workoutPlanSession";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import {
  workoutSessionIdSchema,
  workoutSessionSchema,
} from "../schema/workoutSessionSchema";
import { deleteSession } from "../service/workoutPlanSession";

const workoutPlanSessionRouter = Router();

workoutPlanSessionRouter.post(
  "/:id",
  authenticate,
  authorize("workouts.post"),
  validateReqParams(workoutSessionIdSchema),
  validateReqBody(workoutSessionSchema),
  addWorkoutSession,
);

workoutPlanSessionRouter.delete(
  "/:id",
  authenticate,
  authorize("workouts.delete"),
  validateReqParams(workoutSessionIdSchema),
  removeWorkoutSession,
);

workoutPlanSessionRouter.put(
  "/:id",
  authenticate,
  authorize("workouts.put"),
  validateReqParams(workoutSessionIdSchema),
  updateWorkoutSession,
);

export default workoutPlanSessionRouter;
