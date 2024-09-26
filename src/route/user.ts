import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { createUser } from "../controller/user";
import { createUserBodySchema, getUserQuerySchema } from "../schema/user";

const userRouter = Router();
userRouter.post("/",validateReqBody(createUserBodySchema), createUser);

export default userRouter;
