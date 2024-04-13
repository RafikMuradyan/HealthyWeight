import * as Joi from 'joi';

export const sendEmailSchema = Joi.object({
  from: Joi.alternatives(
    Joi.string().email().required(),
    Joi.object({
      name: Joi.string().required(),
      address: Joi.string().email().required(),
    }),
  ),
  to: Joi.array().items(Joi.string().email()).min(1).required(),
  subject: Joi.string().required(),
  html: Joi.string().required(),
});
