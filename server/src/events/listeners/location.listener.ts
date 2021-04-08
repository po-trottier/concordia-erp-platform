import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '../../api/users/schemas/user.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Audit, AuditDocument } from '../../api/audits/schemas/audits.schema';
import {
  Location,
  LocationDocument,
} from '../../api/locations/schemas/location.schema';
import { UserToken } from '../../shared/user-token.interface';
import { EventMap, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';
import { AuditActions } from '../../api/audits/enums/audit-actions.enum';

@Injectable()
export class LocationListener {
  private readonly logger = new Logger('LocationListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
  ) {}

  getEmailHTML(location: LocationDocument, action: string) {
    return `<p>A location was <b>${action}</b> in your EPIC Resource Planner instance. The details are below:</p>
      <ul>
        <li><b>ID:</b> ${location.id}</li>
        <li><b>Name:</b> ${location.name}</li>
      </ul>`;
  }

  @OnEvent(EventMap.LOCATION_CREATED.id)
  async handleLocationCreated(args: {
    location: LocationDocument;
    token: UserToken;
  }) {
    const emails = await getEmails(
      EventMap.LOCATION_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Location Created',
        html: this.getEmailHTML(args.location, 'created'),
      });
    }

    await this.createAudit(AuditActions.CREATE, args.location, args.token);

    this.logger.log(
      'A location was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.LOCATION_DELETED.id)
  async handleLocationDeleted(args: {
    location: LocationDocument;
    token: UserToken;
  }) {
    const emails = await getEmails(
      EventMap.LOCATION_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Location Deleted',
        html: this.getEmailHTML(args.location, 'deleted'),
      });
    }

    await this.createAudit(AuditActions.DELETE, args.location, args.token);

    this.logger.log(
      'A location was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.LOCATION_MODIFIED.id)
  async handleLocationModified(args: {
    location: LocationDocument;
    token: UserToken;
  }) {
    const emails = await getEmails(
      EventMap.LOCATION_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Location Modified',
        html: this.getEmailHTML(args.location, 'modified'),
      });
    }

    await this.createAudit(AuditActions.UPDATE, args.location, args.token);

    this.logger.log(
      'A location was modified. ' + emails.length + ' user(s) notified.',
    );
  }

  async createAudit(
    action: AuditActions,
    location: LocationDocument,
    token: UserToken,
  ) {
    const audit: Audit = {
      module: Location.name,
      action: action,
      date: new Date(Date.now()),
      target: location.name,
      author: token.username,
    };
    const auditEntry = new this.auditModel(audit);
    await auditEntry.save();
  }
}
