import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '../../api/users/schemas/user.schema';
import { MaterialDocument } from '../../api/materials/materials/schemas/material.schema';
import { MaterialOrderDocument } from '../../api/orders/schemas/material-orders.schema';
import { EventID, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class MaterialListener {
  private readonly logger = new Logger('MaterialListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  @OnEvent(EventID.MATERIAL_CREATED)
  async handleMaterialCreated(material: MaterialDocument) {
    const emails = await getEmails(
      EventID.MATERIAL_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Material Created',
        html: `<p>A new material was created in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          material,
        )}</p>`,
      });
    }

    this.logger.log(
      'A material was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.MATERIAL_DELETED)
  async handleMaterialDeleted(material: MaterialDocument) {
    const emails = await getEmails(
      EventID.MATERIAL_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Material Deleted',
        html: `<p>A material was deleted in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          material,
        )}</p>`,
      });
    }

    this.logger.log(
      'A material was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.MATERIAL_MODIFIED)
  async handleMaterialModified(material: MaterialDocument) {
    const emails = await getEmails(
      EventID.MATERIAL_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Material Modified',
        html: `<p>A material was modified in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          material,
        )}</p>`,
      });
    }

    this.logger.log(
      'A material was modified. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.MATERIAL_ORDERED)
  async handleMaterialOrdered(orders: MaterialOrderDocument[]) {
    const emails = await getEmails(
      EventID.MATERIAL_ORDERED,
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
}
