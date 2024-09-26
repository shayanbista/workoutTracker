import { Router } from "express";

import userRoutes from "./user"
import authRoutes from "./auth";
import exerciseRoutes from "./exercise";

const router = Router();


router.use("/users", userRoutes);
router.use("/auth",authRoutes);
router.use("/exercises",exerciseRoutes);



export default router;
