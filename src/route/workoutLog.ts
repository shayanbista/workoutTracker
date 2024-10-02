import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";


import { addWorkoutLog } from "../controller/workoutLog";
import createWorkoutLogSchema from "../schema/workoutLog";

const workoutLogRouter = Router();


workoutLogRouter.post(
  "/",
  authenticate,
  authorize("workouts.post"),
  validateReqBody(createWorkoutLogSchema),
  addWorkoutLog,
);



export default workoutLogRouter;
