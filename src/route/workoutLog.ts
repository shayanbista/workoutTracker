import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";


import { addWorkoutLog } from "../controller/workoutLog";

const workoutLogRouter = Router();


workoutLogRouter.post(
  "/",
  authenticate,
  authorize("workouts.post"),
  addWorkoutLog,
);



export default workoutLogRouter;
