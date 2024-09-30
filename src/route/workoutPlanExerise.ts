import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { addWorkoutPlan, getWorkoutPlan, getWorkoutPlans, removeWorkoutPlan } from "../controller/workoutPlan";
import { createPlanBodySchema, workoutPlanIdSchema } from "../schema/workoutPlan";
import { addWorkoutPlanExercises } from "../controller/workoutPlanExercise";


const workoutPlanExerciseRouter = Router();
// workoutPlanRouter.post("/", authenticate,authorize("workouts.post"),validateReqBody(createPlanBodySchema),addWorkoutPlan);
workoutPlanExerciseRouter.post("/",addWorkoutPlanExercises);

// workoutPlanRouter.delete("/:id", authenticate,authorize("workouts.delete"),validateReqParams(workoutPlanIdSchema),removeWorkoutPlan);
// workoutPlanRouter.get("/", authenticate,authorize("workouts.get"),getWorkoutPlans);
// workoutPlanRouter.get("/:id", authenticate,authorize("workouts.get"),validateReqParams(workoutPlanIdSchema),getWorkoutPlan);

export default workoutPlanExerciseRouter;
