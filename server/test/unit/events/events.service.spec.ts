import { EventsService } from '../../../src/api/events/events.service';
import { EventDocument } from '../../../src/api/events/schemas/events.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

describe('EventsController', () => {
  let eventsService: EventsService;
  let eventDocument: Model<EventDocument>;
  let emitter: EventEmitter2;
  let jwtService: JwtService;

  beforeEach(async () => {
    eventsService = new EventsService(jwtService, emitter, eventDocument);
  });

  it('should be defined', () => {
    expect(eventsService).toBeDefined();
  });
});
