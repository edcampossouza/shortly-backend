import Joi from "joi";

export const userLoginSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});
