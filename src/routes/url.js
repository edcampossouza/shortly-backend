import { Router } from "express";
import { shortenUrl } from "../controllers/url.js";
import { protectRoute } from "../middlewares/auth.js";
import validateSchema from "../middlewares/validateSchema.js";
import { urlShortenInput } from "../schemas/url.js";

const urlRouter = Router();


urlRouter.post(
  "/urls/shorten",
  protectRoute,
  validateSchema(urlShortenInput),
  shortenUrl
);

export default urlRouter;
