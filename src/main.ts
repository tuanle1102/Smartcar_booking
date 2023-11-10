import { NestFactory } from '@nestjs/core';
import { Swagger } from 'common/swagger/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  Swagger.setup(app)
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
