import * as Joi from 'joi';

export const sendEmailSchema = Joi.object({
  from: Joi.string().email().required(),
  to: Joi.array().items(Joi.string().email()).min(1).required(),
  subject: Joi.string().required(),
  html: Joi.string().required(),
});
