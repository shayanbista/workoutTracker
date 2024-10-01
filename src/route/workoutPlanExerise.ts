import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody } from "../middleware/validator";

import { addWorkoutPlanExercise } from "../controller/workoutPlanExercise";
import {
  createWorkoutPlanExerciseSchema,
  updateWorkoutPlanExerciseSchema,
} from "../schema/workoutPlanExercise";
import { deleteWorkoutPlanExercise } from "../controller/workoutPlanExercise";
import { updateWorkoutPlanExercises } from "../controller/workoutPlanExercise";

const workoutPlanExerciseRouter = Router();
workoutPlanExerciseRouter.post(
  "/",
  authenticate,
  authorize("workouts.post"),
  validateReqBody(createWorkoutPlanExerciseSchema),
  addWorkoutPlanExercise,
);
workoutPlanExerciseRouter.delete(
  "/",
  authenticate,
  authorize("workouts.delete"),
  deleteWorkoutPlanExercise,
);
workoutPlanExerciseRouter.put(
  "/",
  authenticate,
  authorize("workouts.put"),
  validateReqBody(updateWorkoutPlanExerciseSchema),
  updateWorkoutPlanExercises,
);

export default workoutPlanExerciseRouter;
