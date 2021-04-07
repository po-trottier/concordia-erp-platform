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
import { EventMap, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class MaterialListener {
  private readonly logger = new Logger('MaterialListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  getEmailHTML(material: MaterialDocument, action: string) {
    return `<p>A material was <b>${action}</b> in your EPIC Resource Planner instance. The details are below:</p>
      <ul>
        <li><b>ID:</b> ${material.id}</li>
        <li><b>Name:</b> ${material.name}</li>
        <li><b>Density:</b> ${material.density}</li>
        <li><b>Vendor:</b> ${material.vendorName}</li>
        <li><b>Price:</b> ${material.price}</li>
        <li><b>Image:</b><img src='${material.image}' alt='Material' width='32' height='32'/></li>
      </ul>`;
  }

  getOrderEmailHTML(orders: MaterialOrderDocument[]) {
    let total = 0;
    let html = `<p>A material order was <b>placed</b> in your EPIC Resource Planner instance. The details are below:</p>`;

    orders.forEach((order) => {
      total += order.amountDue;
      html += `<ul>
          <li><b>ID:</b> ${order.id}</li>
          <li><b>Name:</b> ${order.materialId}</li>
          <li><b>Quantity:</b> ${order.quantity}</li>
          <li><b>Amount Due:</b> ${order.amountDue}$</li>
          <li><b>Date Due:</b> ${order.dateDue.toLocaleDateString('en-US')}</li>
          <li><b>Date Ordered:</b> ${order.dateOrdered.toLocaleDateString(
            'en-US',
          )}</li>
        </ul>`;
    });

    html += `<p><b>Total Due: ${total}$</b></p>`;

    return html;
  }

  @OnEvent(EventMap.MATERIAL_CREATED.id)
  async handleMaterialCreated(material: MaterialDocument) {
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
        html: this.getEmailHTML(material, 'created'),
      });
    }

    this.logger.log(
      'A material was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.MATERIAL_DELETED.id)
  async handleMaterialDeleted(material: MaterialDocument) {
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
        html: this.getEmailHTML(material, 'deleted'),
      });
    }

    this.logger.log(
      'A material was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.MATERIAL_MODIFIED.id)
  async handleMaterialModified(material: MaterialDocument) {
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
        html: this.getEmailHTML(material, 'modified'),
      });
    }

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
        html: this.getOrderEmailHTML(orders),
      });
    }

    this.logger.log(
      'A material was ordered. ' + emails.length + ' user(s) notified.',
    );
  }
}
