import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { createUser } from "../controller/user";

const userRouter = Router();
userRouter.post("/", createUser);

export default userRouter;
