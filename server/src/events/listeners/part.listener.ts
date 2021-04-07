import {Injectable, Logger} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Event, EventDocument} from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {User, UserDocument} from '../../api/users/schemas/user.schema';
import {Part, PartDocument} from '../../api/parts/parts/schemas/part.schema';
import {PartStockDocument} from '../../api/parts/parts/schemas/part-stock.schema';
import {EventMap, getEmails} from '../common';
import {Mail} from '../../shared/mail';
import {CONTACT_EMAIL} from '../../shared/constants';
import {UserToken} from "../../shared/user-token.interface";
import {Audit, AuditDocument} from "../../api/audits/schemas/audits.schema";
import {AuditActions} from "../../api/audits/audit.actions.enum";

@Injectable()
export class PartListener {
  private readonly logger = new Logger('PartListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
  ) {}

  @OnEvent(EventMap.PART_CREATED.id)
  async handlePartCreated(args: {part: PartDocument, token: UserToken}) {
    const emails = await getEmails(
      EventMap.PART_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Part Created',
        html: `<p>A new part was created in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          args.part,
        )}</p>`,
      });
    }

    const audit : Audit = {
      module: Part.name,
      action: AuditActions.CREATE,
      date: new Date(Date.now()),
      target: args.part.name,
      author: args.token.username,
    }
    const auditEntry = new this.auditModel(audit)
    await auditEntry.save();

    this.logger.log(
      'A part was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PART_DELETED.id)
  async handlePartDeleted(args: {part: PartDocument, token: UserToken}) {
    const emails = await getEmails(
      EventMap.PART_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Part Deleted',
        html: `<p>A part was deleted in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          args.part,
        )}</p>`,
      });
    }

    const audit : Audit = {
      module: Part.name,
      action: AuditActions.DELETE,
      date: new Date(Date.now()),
      target: args.part.name,
      author: args.token.username,
    }
    const auditEntry = new this.auditModel(audit)
    await auditEntry.save();

    this.logger.log(
      'A part was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PART_MODIFIED.id)
  async handlePartModified(args: {part: PartDocument, token: UserToken}) {
    const emails = await getEmails(
      EventMap.PART_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Part Modified',
        html: `<p>A part was modified in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          args.part,
        )}</p>`,
      });
    }
    const audit : Audit = {
      module: Part.name,
      action: AuditActions.UPDATE,
      date: new Date(Date.now()),
      target: args.part.name,
      author: args.token.username,
    }
    const auditEntry = new this.auditModel(audit)
    await auditEntry.save();

    this.logger.log(
      'A part was modified. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PART_BUILT.id)
  async handlePartBuilt(stocks: PartStockDocument[]) {
    const emails = await getEmails(
      EventMap.PART_BUILT,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Part Built',
        html: `<p>One or more part was built in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          stocks,
        )}</p>`,
      });
    }

    this.logger.log(
      'A part was built. ' + emails.length + ' user(s) notified.',
    );
  }
}
