import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from './schemas/events.schema';
import { Events } from '../../shared/events';

/**
 * Used by the EventsController, handles event data storage and retrieval.
 */
@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  /**
   * Creates event using mongoose eventModel
   *
   * @param createEventDto dto used to create events
   */
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return await createdEvent.save();
  }

  /**
   * Retrieves all events using mongoose eventModel
   */
  async findEvents(): Promise<{ name: string; id: string }[]> {
    return Events;
  }

  /**
   * Retrieves all events using mongoose eventModel
   */
  async findAll(): Promise<Event[]> {
    return this.eventModel.find();
  }

  /**
   * Retrieves a event by id using mongoose eventModel
   *
   * @param id string of the event's objectId
   */
  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    return this.validateEventFound(event, id);
  }

  /**
   * Updates event by id using mongoose eventModel
   *
   * @param id string of the event's objectId
   * @param updateEventDto dto used to update events
   */
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      id,
      { updateEventDto },
      { new: true },
    );
    return this.validateEventFound(updatedEvent, id);
  }

  /**
   * Deletes event by id using mongoose eventModel
   *
   * @param id string of the event's objectId
   */
  async remove(id: string): Promise<Event> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id);
    return this.validateEventFound(deletedEvent, id);
  }

  /**
   * Returns NotFoundException if event is null, otherwise returns event
   *
   * @param eventResult a retrieved event
   * @param id string of the event's objectId
   */
  validateEventFound(eventResult: any, id: string) {
    if (!eventResult) {
      throw new NotFoundException(`event with id ${id} not found`);
    } else {
      return eventResult;
    }
  }
}
