import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApiModule } from './api/api/api.module';
import { validate } from './shared/env';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ApiModule,
    // Events Support
    EventEmitterModule.forRoot(),
    // ENV Support
    ConfigModule.forRoot({
      validate,
      cache: true,
      isGlobal: true,
    }),
    // Cron Job Support
    ScheduleModule.forRoot(),
    // Use the output of the react build as static assets
    // Relative path: ../../client/build
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
      exclude: ['/api*'],
    }),
  ],
  providers: [],
})
export class AppModule {}
