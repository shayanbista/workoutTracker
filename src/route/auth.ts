import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { login } from "../controller/auth";
import { loginSchema } from "../schema/login";

const authRouter = Router();
authRouter.post("/login", validateReqBody(loginSchema), login);

export default authRouter;
