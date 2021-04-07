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
import { EventMap, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class ProductListener {
  private readonly logger = new Logger('ProductListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  getEmailHTML(product: ProductDocument, action: string) {
    return `<p>A product was <b>${action}</b> in your EPIC Resource Planner instance. The details are below:</p>
      <ul>
        <li><b>ID:</b> ${product.id}</li>
        <li><b>Name:</b> ${product.name}</li>
        <li><b>Price:</b> ${product.price}</li>
        <li><b>Parts:</b> ${product.parts.join(', ')}</li>
        <li><b>Properties:</b> 
          <ul>
            ${product.properties.map(
              (prop) => '<li><b>' + prop.key + ':</b> ' + prop.value + '</li>',
            )}
          </ul>
        </li>
      </ul>`;
  }

  getBuildEmailHTML(builds: ProductStockDocument[]) {
    let html = `<p>Some products were <b>built</b> in your EPIC Resource Planner instance. The details are below:</p>`;

    builds.forEach((build) => {
      html += `<ul>
          <li><b>ID:</b> ${build.id}</li>
          <li><b>Product ID:</b> ${build.productId}</li>
          <li><b>Quantity:</b> ${build.stock}</li>
        </ul>`;
    });

    return html;
  }

  getOrderEmailHTML(orders: ProductOrderDocument[]) {
    let total = 0;
    let html = `<p>A product order was <b>placed</b> in your EPIC Resource Planner instance. The details are below:</p>`;

    orders.forEach((order) => {
      total += order.amountDue;
      html += `<ul>
          <li><b>ID:</b> ${order.id}</li>
          <li><b>Name:</b> ${order.productId}</li>
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

  @OnEvent(EventMap.PRODUCT_CREATED.id)
  async handleProductCreated(product: ProductDocument) {
    const emails = await getEmails(
      EventMap.PRODUCT_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Product Created',
        html: this.getEmailHTML(product, 'created'),
      });
    }

    this.logger.log(
      'A product was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PRODUCT_DELETED.id)
  async handleProductDeleted(product: ProductDocument) {
    const emails = await getEmails(
      EventMap.PRODUCT_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Product Deleted',
        html: this.getEmailHTML(product, 'deleted'),
      });
    }

    this.logger.log(
      'A product was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PRODUCT_MODIFIED.id)
  async handleProductModified(product: ProductDocument) {
    const emails = await getEmails(
      EventMap.PRODUCT_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Product Modified',
        html: this.getEmailHTML(product, 'modified'),
      });
    }

    this.logger.log(
      'A product was modified. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PRODUCT_BUILT.id)
  async handleProductBuilt(stocks: ProductStockDocument[]) {
    const emails = await getEmails(
      EventMap.PRODUCT_BUILT,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Product Built',
        html: this.getBuildEmailHTML(stocks),
      });
    }

    this.logger.log(
      'A product was built. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.PRODUCT_SOLD.id)
  async handleProductSold(orders: ProductOrderDocument[]) {
    const emails = await getEmails(
      EventMap.PRODUCT_SOLD,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Product Sold',
        html: this.getOrderEmailHTML(orders),
      });
    }

    this.logger.log(
      'A product was sold. ' + emails.length + ' user(s) notified.',
    );
  }
}
