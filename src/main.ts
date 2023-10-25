import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from './common/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Swagger.setup(app)
  await app.listen(3000);
}
bootstrap();
