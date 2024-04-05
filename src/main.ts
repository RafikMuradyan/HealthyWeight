import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { buildSwagger } from './configs';
import { ValidationPipe } from '@nestjs/common';
// const { loadEnvFile } = require('node:process');

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // node version must be >= 21.7.0
  // loadEnvFile();

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  buildSwagger(app);
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.info(`Server running on http://localhost:${port}`);

  return app;
}
void bootstrap();
