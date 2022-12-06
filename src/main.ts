import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); //Now the Hello world will appear on "localhost:3000/api" instead of "localhost:3000"
  await app.listen(3000);
}
bootstrap();
