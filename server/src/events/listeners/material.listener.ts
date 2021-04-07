import {Injectable, Logger} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Event, EventDocument} from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {User, UserDocument} from '../../api/users/schemas/user.schema';
import {Material, MaterialDocument} from '../../api/materials/materials/schemas/material.schema';
import {MaterialOrderDocument} from '../../api/orders/schemas/material-orders.schema';
import {EventMap, getEmails} from '../common';
import {Mail} from '../../shared/mail';
import {CONTACT_EMAIL} from '../../shared/constants';
import {Audit, AuditDocument} from "../../api/audits/schemas/audits.schema";
import {UserToken} from "../../shared/user-token.interface";
import {AuditActions} from "../../api/audits/audit.actions.enum";


@Injectable()
export class MaterialListener {
  private readonly logger = new Logger('MaterialListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
  ) {}

  @OnEvent(EventMap.MATERIAL_CREATED.id)
  async handleMaterialCreated(args: {material: MaterialDocument, token: UserToken}) {
    const emails = await getEmails(
      EventMap.MATERIAL_CREATED,
      this.eventModel,
      this.userModel,
    );


    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Material Created',
        html: `<p>A new material was created in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          args.material,
        )}</p>`,
      });
    }

    await this.createAudit(AuditActions.CREATE, args.material, args.token);

    this.logger.log(
      'A material was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.MATERIAL_DELETED.id)
  async handleMaterialDeleted(args: {material: MaterialDocument, token: UserToken}) {
    const emails = await getEmails(
      EventMap.MATERIAL_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Material Deleted',
        html: `<p>A material was deleted in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          args.material,
        )}</p>`,
      });
    }

    await this.createAudit(AuditActions.DELETE, args.material, args.token);

    this.logger.log(
      'A material was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.MATERIAL_MODIFIED.id)
  async handleMaterialModified(args: {material: MaterialDocument, token: UserToken}) {
    const emails = await getEmails(
      EventMap.MATERIAL_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Material Modified',
        html: `<p>A material was modified in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          args.material,
        )}</p>`,
      });
    }

    await this.createAudit(AuditActions.UPDATE, args.material, args.token);

    this.logger.log(
      'A material was modified. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.MATERIAL_ORDERED.id)
  async handleMaterialOrdered(orders: MaterialOrderDocument[]) {
    const emails = await getEmails(
      EventMap.MATERIAL_ORDERED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Material Ordered',
        html: `<p>One or more material was ordered in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          orders,
        )}</p>`,
      });
    }

    this.logger.log(
      'A material was ordered. ' + emails.length + ' user(s) notified.',
    );
  }

  async createAudit(action: AuditActions, material: MaterialDocument, token: UserToken){
    const audit : Audit = {
      module: Material.name,
      action: AuditActions.CREATE,
      date: new Date(Date.now()),
      target: material.name,
      author: token.username,
    }
    const auditEntry = new this.auditModel(audit)
    await auditEntry.save();
  }
}
