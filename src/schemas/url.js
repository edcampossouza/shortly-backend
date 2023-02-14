import Joi from "joi";

export const urlShortenInput = Joi.object({
  url: Joi.string().required(),
});
