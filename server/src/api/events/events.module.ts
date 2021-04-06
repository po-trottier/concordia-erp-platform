import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event, EventSchema } from './schemas/events.schema';
import { EventListener } from '../../events/listeners/event.listener';
import { validate } from '../../shared/env';
import { UsersModule } from '../users/users.module';

/**
 * Contains all logic and files related to Event
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    // Events Listener Dependency
    UsersModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [EventsController],
  providers: [EventsService, EventListener],
  exports: [EventsService, MongooseModule],
})
export class EventsModule {}
