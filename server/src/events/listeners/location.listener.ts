import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '../../api/users/schemas/user.schema';
import { LocationDocument } from '../../api/locations/schemas/location.schema';
import { EventID, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class LocationListener {
  private readonly logger = new Logger('LocationListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  @OnEvent(EventID.LOCATION_CREATED)
  async handleLocationCreated(location: LocationDocument) {
    const emails = await getEmails(
      EventID.LOCATION_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Location Created',
        html: `<p>A new location was created in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          location,
        )}</p>`,
      });
    }

    this.logger.log(
      'A location was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.LOCATION_DELETED)
  async handleLocationDeleted(location: LocationDocument) {
    const emails = await getEmails(
      EventID.LOCATION_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Location Deleted',
        html: `<p>A location was deleted in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          location,
        )}</p>`,
      });
    }

    this.logger.log(
      'A location was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.LOCATION_MODIFIED)
  async handleLocationModified(location: LocationDocument) {
    const emails = await getEmails(
      EventID.LOCATION_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Location Modified',
        html: `<p>A location was modified in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          location,
        )}</p>`,
      });
    }

    this.logger.log(
      'A location was modified. ' + emails.length + ' user(s) notified.',
    );
  }
}
