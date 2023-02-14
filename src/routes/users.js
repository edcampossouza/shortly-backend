import { Router } from "express";
import { protectRoute } from "../middlewares/auth.js";
import { userData, usersRanking } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/users/me", protectRoute, userData);
userRouter.get("/ranking", usersRanking);

export default userRouter;
