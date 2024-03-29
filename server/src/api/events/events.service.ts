import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from './schemas/events.schema';
import { UserToken } from '../../shared/user-token.interface';
import { EventMap } from '../../events/common';

/**
 * Used by the EventsController, handles event data storage and retrieval.
 */
@Injectable()
export class EventsService {
  constructor(
    private jwtService: JwtService,
    private emitter: EventEmitter2,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  // Make sure there is only ever 1 recipient type. This method is not
  // ideal as it prioritizes some types of recipients but it's a quick
  // fix to an otherwise more complex problem.
  validateRecipients(
    updateEventDto: UpdateEventDto | CreateEventDto,
    required: boolean,
  ) {
    const updatedFields = updateEventDto;
    if (updatedFields.customerId) {
      updatedFields.userId = [];
      updatedFields.role = [];
    } else if (updatedFields.userId) {
      updatedFields.customerId = [];
      updatedFields.role = [];
    } else if (updatedFields.role) {
      updatedFields.userId = [];
      updatedFields.customerId = [];
    } else if (required) {
      throw new BadRequestException(
        'At least one recipient must be present in the listener.',
      );
    }
    return updatedFields;
  }

  /**
   * Creates event using mongoose eventModel
   *
   * @param auth
   * @param createEventDto dto used to create events
   */
  async create(auth: string, createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(
      this.validateRecipients(createEventDto, true),
    );

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token: UserToken = decoded;

    const event = await createdEvent.save();
    this.emitter.emit(EventMap.EVENT_CREATED.id, { event, token });
    return event;
  }

  /**
   * Retrieves all events using mongoose eventModel
   */
  async findEvents(): Promise<{ name: string; id: string }[]> {
    return Object.values(EventMap);
  }

  /**
   * Retrieves all events using mongoose eventModel
   */
  async findAll(): Promise<Event[]> {
    const events = await this.eventModel
      .find()
      .populate('userId')
      .populate('customerId')
      .exec();

    for (const event of events) {
      if (event.userId.length > 0) {
        for (const user of event.userId) {
          const obj: any = user;
          obj.password = undefined;
        }
      }
    }

    return events;
  }

  /**
   * Retrieves a event by id using mongoose eventModel
   *
   * @param id string of the event's objectId
   */
  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel
      .findById(id)
      .populate('userId')
      .populate('customerId')
      .exec();
    return this.validateEventFound(event, id);
  }

  /**
   * Updates event by id using mongoose eventModel
   *
   * @param auth
   * @param id string of the event's objectId
   * @param updateEventDto dto used to update events
   */
  async update(
    auth: string,
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    // Make sure we only ever have 1 "to" field max

    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(
        id,
        { ...this.validateRecipients(updateEventDto, false) },
        { new: true },
      )
      .populate('userId')
      .populate('customerId')
      .exec();

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token: UserToken = decoded;

    const event = this.validateEventFound(updatedEvent, id);
    this.emitter.emit(EventMap.EVENT_MODIFIED.id, { event, token });
    return event;
  }

  /**
   * Deletes event by id using mongoose eventModel
   *
   * @param auth
   * @param id string of the event's objectId
   */
  async remove(auth: string, id: string): Promise<Event> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id);

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token: UserToken = decoded;

    const event = this.validateEventFound(deletedEvent, id);
    this.emitter.emit(EventMap.EVENT_DELETED.id, { event, token });
    return event;
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
      if (eventResult.userId.length > 0) {
        for (const user of eventResult.userId) {
          user.password = undefined;
        }
      }
      return eventResult;
    }
  }
}
