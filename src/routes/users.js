import { Router } from "express";
import { protectRoute } from "../middlewares/auth.js";
import { userData } from "../controllers/users.js";

const userRouter = Router();

userRouter.use(protectRoute);

userRouter.get("/users/me", userData);

export default userRouter;
