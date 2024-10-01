import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { addWorkoutPlan, getWorkoutPlan, getWorkoutPlans, removeWorkoutPlan } from "../controller/workoutPlan";
import { createPlanBodySchema, workoutPlanIdSchema } from "../schema/workoutPlan";
import { addWorkoutPlanExercise } from "../controller/workoutPlanExercise";
import { createWorkoutPlanExerciseSchema } from "../schema/workoutPlanExercise";
import { deleteWorkoutPlanExercise } from "../controller/workoutPlanExercise";
import { updateWorkoutPlanExercises } from "../controller/workoutPlanExercise";


const workoutPlanExerciseRouter = Router();
// workoutPlanRouter.post("/", authenticate,authorize("workouts.post"),validateReqBody(createPlanBodySchema),addWorkoutPlan);
workoutPlanExerciseRouter.post("/",authenticate,authorize("workouts.post"),validateReqBody(createWorkoutPlanExerciseSchema),addWorkoutPlanExercise);
workoutPlanExerciseRouter.delete("/",authenticate,authorize("workouts.delete"),deleteWorkoutPlanExercise);
workoutPlanExerciseRouter.put("/",authenticate,authorize("workouts.put"),updateWorkoutPlanExercises);


// workoutPlanRouter.delete("/:id", authenticate,authorize("workouts.delete"),validateReqParams(workoutPlanIdSchema),removeWorkoutPlan);
// workoutPlanRouter.get("/", authenticate,authorize("workouts.get"),getWorkoutPlans);
// workoutPlanRouter.get("/:id", authenticate,authorize("workouts.get"),validateReqParams(workoutPlanIdSchema),getWorkoutPlan);

export default workoutPlanExerciseRouter;
