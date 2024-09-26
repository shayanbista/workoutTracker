import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { addExercise, getExercises } from "../controller/exercise";

const exerciseRouter = Router();
exerciseRouter.post("/", authenticate, authorize("exercises.add"), addExercise);
exerciseRouter.get("/", authenticate, authorize("exercises.get"), getExercises);

export default exerciseRouter;
