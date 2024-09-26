import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { login } from "../controller/auth";

const authRouter = Router();
authRouter.post("/login", login);

export default authRouter;
