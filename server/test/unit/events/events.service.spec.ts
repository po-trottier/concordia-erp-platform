import { EventsService } from '../../../src/api/events/events.service';
import { EventDocument } from '../../../src/api/events/schemas/events.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';

describe('EventsController', () => {
  let eventsService: EventsService;
  let eventDocument: Model<EventDocument>;
  let emitter: EventEmitter2;

  beforeEach(async () => {
    eventsService = new EventsService(emitter, eventDocument);
  });

  it('should be defined', () => {
    expect(eventsService).toBeDefined();
  });
});
