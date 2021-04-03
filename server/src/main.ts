import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 5500;

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // Manually set max request size
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  // Start the server
  await app.listen(PORT).then(() => {
    new Logger('Startup').log('Server Listening on Port ' + PORT);
  });
};

bootstrap();
