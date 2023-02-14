import { Router } from "express";
import {
  shortenUrl,
  getUrl,
  getUrlByShortUrl,
  deleteUrl,
} from "../controllers/url.js";
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
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", getUrlByShortUrl);
urlRouter.delete("/urls/:id", protectRoute, deleteUrl);

export default urlRouter;
