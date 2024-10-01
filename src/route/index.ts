import { Router } from "express";

import userRoutes from "./user";
import authRoutes from "./auth";
import exerciseRoutes from "./exercise";
import workoutPlanRoutes from "./workoutPlan";
import workoutPlanExerciseRoutes from "./workoutPlanExerise";
import workoutPlanSessionRoutes from "./workoutPlanSession"
import workoutLogRoutes from "./workoutLog";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/workoutPlans", workoutPlanRoutes);
router.use("/workoutPlanExercises", workoutPlanExerciseRoutes);
router.use("/workoutPlanSessions", workoutPlanSessionRoutes);
router.use("/workoutLogs", workoutLogRoutes);

export default router;
