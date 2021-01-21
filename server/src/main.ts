import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 5500;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.listen(PORT).then(() => {
    console.log('Server Listening on Port', PORT);
  });
}

bootstrap();
