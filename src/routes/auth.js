import { Router } from "express";
import { signup, signin } from "../controllers/auth.js";
import validateSchema from "../middlewares/validateSchema.js";
import { userSignupSchema, userSigninSchema } from "../schemas/user.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSignupSchema), signup);
authRouter.post("/signin", validateSchema(userSigninSchema), signin);

export default authRouter;
