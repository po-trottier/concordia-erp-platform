import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '../../api/users/schemas/user.schema';
import { EventMap, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class EventListener {
  private readonly logger = new Logger('EventListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  @OnEvent(EventMap.EVENT_CREATED.id)
  async handleEventCreated(event: EventDocument) {
    const emails = await getEmails(
      EventMap.EVENT_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Event Created',
        html: `<p>A new event was created in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          event,
        )}</p>`,
      });
    }

    this.logger.log(
      'An event was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.EVENT_DELETED.id)
  async handleEventDeleted(event: EventDocument) {
    const emails = await getEmails(
      EventMap.EVENT_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Event Deleted',
        html: `<p>An event was deleted in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          event,
        )}</p>`,
      });
    }

    this.logger.log(
      'An event was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.EVENT_MODIFIED.id)
  async handleEventModified(event: EventDocument) {
    const emails = await getEmails(
      EventMap.EVENT_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Event Modified',
        html: `<p>An event was modified in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          event,
        )}</p>`,
      });
    }

    this.logger.log(
      'An event was modified. ' + emails.length + ' user(s) notified.',
    );
  }
}
