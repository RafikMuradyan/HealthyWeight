import * as Joi from 'joi';

const databaseConfigSchema = Joi.object({
  type: Joi.string().valid('postgres').required(),
  host: Joi.string().required(),
  port: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  database: Joi.string().required(),
  ssl: Joi.object({
    rejectUnauthorized: Joi.boolean().required(),
  }).optional(),
  synchronize: Joi.boolean().required(),
  entities: Joi.array().items(Joi.any()).required(),
  subscribers: Joi.array().items(Joi.any()),
  migrations: Joi.array().items(Joi.string()).required(),
});

export default databaseConfigSchema;
