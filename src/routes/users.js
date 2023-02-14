import { Router } from "express";
import { protectRoute } from "../middlewares/auth.js";
import { userData } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/users/me", protectRoute, userData);

export default userRouter;
