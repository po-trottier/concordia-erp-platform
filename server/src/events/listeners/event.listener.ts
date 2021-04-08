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
import {UserToken} from "../../shared/UserToken";
import {AuditActions} from "../../api/audits/audit.actions.enum";
import {Part, PartDocument} from "../../api/parts/parts/schemas/part.schema";
import {Audit, AuditDocument} from "../../api/audits/schemas/audits.schema";

@Injectable()
export class EventListener {
  private readonly logger = new Logger('EventListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
  ) {}

  getEmailHTML(event: EventDocument, action: string) {
    return `<p>An event was <b>${action}</b> in your EPIC Resource Planner instance. The details are below:</p>
      <ul>
        <li><b>ID:</b> ${event.id}</li>
        <li><b>Event ID:</b> ${event.eventId}</li>
        <li><b>Customer IDs:</b> ${
          event.customerId && event.customerId.length > 0
            ? event.customerId
            : 'None'
        }</li>
        <li><b>User IDs:</b> ${
          event.userId && event.userId.length > 0 ? event.userId : 'None'
        }</li>
        <li><b>Roles:</b> ${
          event.role && event.role.length > 0 ? event.role : 'None'
        }</li>
      </ul>`;
  }

  @OnEvent(EventMap.EVENT_CREATED.id)
  async handleEventCreated(args: {event: EventDocument, token: UserToken}) {
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
        html: this.getEmailHTML(args.event, 'created'),
      });
    }

    await this.createAudit(AuditActions.CREATE, args.event, args.token);

    this.logger.log(
      'An event was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.EVENT_DELETED.id)
  async handleEventDeleted(args: {event: EventDocument, token: UserToken}) {
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
        html: this.getEmailHTML(args.event, 'deleted'),
      });
    }

    await this.createAudit(AuditActions.DELETE, args.event, args.token);

    this.logger.log(
      'An event was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.EVENT_MODIFIED.id)
  async handleEventModified(args: {event: EventDocument, token: UserToken}) {
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
        html: this.getEmailHTML(args.event, 'modified'),
      });
    }

    await this.createAudit(AuditActions.UPDATE, args.event, args.token);

    this.logger.log(
      'An event was modified. ' + emails.length + ' user(s) notified.',
    );
  }

  async createAudit(action: AuditActions, event: EventDocument, token: UserToken){
    const audit : Audit = {
      module: Event.name,
      action: action,
      date: new Date(Date.now()),
      target: event.eventId,
      author: token.username,
    }
    const auditEntry = new this.auditModel(audit)
    await auditEntry.save();
  }
}
