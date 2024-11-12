import { Router } from "express";
import authRouter from "./v1/authRouter.js";

// To manage all the routers, to avoid cluttering
const router = Router();

router.use("/auth", authRouter);

export default router;
