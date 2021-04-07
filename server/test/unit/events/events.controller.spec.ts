import { EventsController } from '../../../src/api/events/events.controller';
import { EventsService } from '../../../src/api/events/events.service';
import { CreateEventDto } from '../../../src/api/events/dto/create-event.dto';
import { UpdateEventDto } from '../../../src/api/events/dto/update-event.dto';
import { EventDocument, Event } from '../../../src/api/events/schemas/events.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;
  let eventDocument: Model<EventDocument>;
  let emitter: EventEmitter2;

  const dummyEvent : Event = {
    eventId: 'event123',
    customerId: ['customer123'],
    userId: ['user123'],
    role: [1],
  }

  beforeEach(async () => {
    eventsService = new EventsService(emitter, eventDocument);
    eventsController = new EventsController(eventsService);
  });

  describe('create', () => {
    it('Should create an event', async () => {
      const result : Event = dummyEvent;

      const createEventDto = new CreateEventDto();
      createEventDto.eventId = result.eventId;
      createEventDto.customerId = result.customerId;
      createEventDto.userId = result.userId;
      createEventDto.role = result.role;

      jest
        .spyOn(eventsService, 'create')
        .mockImplementation(async () => await result);

      expect(await eventsController.create(createEventDto)).toBe(result);
    });
  });

  describe('findEvents', () => {
    it('Should find all events', async () => {
      const result : any[] = [dummyEvent];

      jest
        .spyOn(eventsService, 'findEvents')
        .mockImplementation(async () => await result);

      expect(await eventsController.findEvents()).toBe(result);
    });
  });

  describe('findAll', () => {
    it('Should find all events', async () => {
      const result : Event[] = [dummyEvent];

      jest
        .spyOn(eventsService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await eventsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should find all events', async () => {
      const result : Event = dummyEvent;

      jest
        .spyOn(eventsService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await eventsController.findOne(dummyEvent.eventId)).toBe(result);
    });
  });

  describe('update', () => {
    it('Should find all events', async () => {
      const result : Event = dummyEvent;

      const updateEventDto = new UpdateEventDto();
      updateEventDto.eventId = result.eventId;
      updateEventDto.customerId = result.customerId;
      updateEventDto.userId = result.userId;
      updateEventDto.role = result.role;

      jest
        .spyOn(eventsService, 'update')
        .mockImplementation(async () => await result);

      expect(await eventsController.update(dummyEvent.eventId, updateEventDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should find all events', async () => {
      const result : Event = dummyEvent;

      jest
        .spyOn(eventsService, 'remove')
        .mockImplementation(async () => await result);

      expect(await eventsController.remove(dummyEvent.eventId)).toBe(result);
    });
  });
});
