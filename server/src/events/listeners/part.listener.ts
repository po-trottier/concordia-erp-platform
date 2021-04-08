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
import { Part, PartDocument } from '../../api/parts/parts/schemas/part.schema';
import { PartStockDocument } from '../../api/parts/parts/schemas/part-stock.schema';
import { UserToken } from '../../shared/user-token.interface';
import { EventMap, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';
import { AuditActions } from '../../api/audits/enums/audit-actions.enum';

@Injectable()
export class PartListener {
  private readonly logger = new Logger('PartListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
  ) {}

  getEmailHTML(part: PartDocument, action: string) {
    return `<p>A part was <b>${action}</b> in your EPIC Resource Planner instance. The details are below:</p>
      <ul>
        <li><b>ID:</b> ${part.id}</li>
        <li><b>Name:</b> ${part.name}</li>
        <li><b>Materials:</b> ${part.materials.join(', ')}</li>
      </ul>`;
  }

  getBuildEmailHTML(builds: PartStockDocument[]) {
    let html = `<p>Some parts were <b>built</b> in your EPIC Resource Planner instance. The details are below:</p>`;

    builds.forEach((build) => {
      html += `<ul>
          <li><b>ID:</b> ${build.id}</li>
          <li><b>Part ID:</b> ${build.partId}</li>
          <li><b>Quantity:</b> ${build.stock}</li>
        </ul>`;
    });

    return html;
  }

  @OnEvent(EventMap.PART_CREATED.id)
  async handlePartCreated(args: { part: PartDocument; token: UserToken }) {
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

        html: this.getEmailHTML(args.part, 'created'),
      });
    }

    await this.createAudit(AuditActions.CREATE, args.part, args.token);

    this.logger.log(
      'A part was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PART_DELETED.id)
  async handlePartDeleted(args: { part: PartDocument; token: UserToken }) {
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
        html: this.getEmailHTML(args.part, 'deleted'),
      });
    }

    await this.createAudit(AuditActions.DELETE, args.part, args.token);

    this.logger.log(
      'A part was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PART_MODIFIED.id)
  async handlePartModified(args: { part: PartDocument; token: UserToken }) {
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
        html: this.getEmailHTML(args.part, 'modified'),
      });
    }

    await this.createAudit(AuditActions.UPDATE, args.part, args.token);

    this.logger.log(
      'A part was modified. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PART_BUILT.id)
  async handlePartBuilt(args: {
    buildResults: PartStockDocument[];
    token: UserToken;
  }) {
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
        html: this.getBuildEmailHTML(args.buildResults),
      });
    }

    this.logger.log(
      'A part was built. ' + emails.length + ' user(s) notified.',
    );
  }

  async createAudit(
    action: AuditActions,
    part: PartDocument,
    token: UserToken,
  ) {
    const audit: Audit = {
      module: Part.name,
      action: action,
      date: new Date(Date.now()),
      target: part.name,
      author: token.username,
    };
    const auditEntry = new this.auditModel(audit);
    await auditEntry.save();
  }
}
