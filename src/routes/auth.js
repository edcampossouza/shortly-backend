import { Router } from "express";
import { signup } from "../controllers/auth.js";
import validateSchema from "../middlewares/validateSchema.js";
import { userLoginSchema } from "../schemas/user.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userLoginSchema), signup);

export default authRouter;
