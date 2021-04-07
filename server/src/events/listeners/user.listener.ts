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
import {Audit, AuditDocument} from "../../api/audits/schemas/audits.schema";

@Injectable()
export class UserListener {
  private readonly logger = new Logger('UserListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  @OnEvent(EventMap.USER_CREATED.id)
  async handleUserCreated(user: UserDocument) {
    const emails = await getEmails(
      EventMap.USER_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New User Created',
        html: `<p>A new user was created in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          user,
        )}</p>`,
      });
    }

    this.logger.log(
      'A user was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.USER_DELETED.id)
  async handleUserDeleted(user: UserDocument) {
    const emails = await getEmails(
      EventMap.USER_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] User Deleted',
        html: `<p>A user was deleted in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          user,
        )}</p>`,
      });
    }

    this.logger.log(
      'A user was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.USER_MODIFIED.id)
  async handleUserModified(user: UserDocument) {
    const emails = await getEmails(
      EventMap.USER_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] User Modified',
        html: `<p>A user was modified in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          user,
        )}</p>`,
      });
    }

    this.logger.log(
      'A user was modified. ' + emails.length + ' user(s) notified.',
    );
  }
}
