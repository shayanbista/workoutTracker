import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { addExercise, getExercise, getExercises } from "../controller/exercise";
import { createExerciseBodySchema, exerciseIdSchema } from "../schema/exercise";

const exerciseRouter = Router();
exerciseRouter.post(
  "/",
  authenticate,
  authorize("exercises.add"),
  validateReqBody(createExerciseBodySchema),
  addExercise,
);
exerciseRouter.get("/", authenticate, authorize("exercises.get"), getExercises);
exerciseRouter.get(
  "/:id",
  authenticate,
  authorize("exercises.get"),
  validateReqParams(exerciseIdSchema),
  getExercise,
);

export default exerciseRouter;
