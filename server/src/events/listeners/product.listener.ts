import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '../../api/users/schemas/user.schema';
import { ProductDocument } from '../../api/products/products/schemas/products.schema';
import { ProductStockDocument } from '../../api/products/products/schemas/product-stock.schema';
import { ProductOrderDocument } from '../../api/orders/schemas/product-orders.schema';
import { EventID, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class ProductListener {
  private readonly logger = new Logger('ProductListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  @OnEvent(EventID.PRODUCT_CREATED)
  async handleProductCreated(product: ProductDocument) {
    const emails = await getEmails(
      EventID.PRODUCT_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Product Created',
        html: `<p>A new product was created in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          product,
        )}</p>`,
      });
    }

    this.logger.log(
      'A product was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.PRODUCT_DELETED)
  async handleProductDeleted(product: ProductDocument) {
    const emails = await getEmails(
      EventID.PRODUCT_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Product Deleted',
        html: `<p>A product was deleted in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          product,
        )}</p>`,
      });
    }

    this.logger.log(
      'A product was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.PRODUCT_MODIFIED)
  async handleProductModified(product: ProductDocument) {
    const emails = await getEmails(
      EventID.PRODUCT_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Product Modified',
        html: `<p>A product was modified in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          product,
        )}</p>`,
      });
    }

    this.logger.log(
      'A product was modified. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.PRODUCT_BUILT)
  async handleProductBuilt(stocks: ProductStockDocument[]) {
    const emails = await getEmails(
      EventID.PRODUCT_BUILT,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Product Built',
        html: `<p>One or more product was built in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          stocks,
        )}</p>`,
      });
    }

    this.logger.log(
      'A product was built. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.PRODUCT_SOLD)
  async handleProductSold(orders: ProductOrderDocument[]) {
    const emails = await getEmails(
      EventID.PRODUCT_SOLD,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Product Sold',
        html: `<p>One or more product was sold in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          orders,
        )}</p>`,
      });
    }

    this.logger.log(
      'A product was sold. ' + emails.length + ' user(s) notified.',
    );
  }
}
