import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { addWorkoutLog, getUserReport } from "../controller/workoutLog";
import createWorkoutLogSchema from "../schema/workoutLog";

const workoutLogRouter = Router();

workoutLogRouter.post(
  "/",
  authenticate,
  authorize("workouts.post"),
  validateReqBody(createWorkoutLogSchema),
  addWorkoutLog,
);

workoutLogRouter.get(
  "/",
  authenticate,
  authorize("workouts.get"),
  getUserReport,
);

export default workoutLogRouter;
