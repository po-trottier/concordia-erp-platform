import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '../../api/users/schemas/user.schema';
import { ProductOrderDocument } from '../../api/orders/schemas/product-orders.schema';
import { MaterialOrderDocument } from '../../api/orders/schemas/material-orders.schema';
import { EventMap, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class OrderListener {
  private readonly logger = new Logger('OrderListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  getPayableEmailHTML(orders: MaterialOrderDocument[]) {
    let total = 0;
    let html = `<p>Some accounts payable were <b>paid</b> in your EPIC Resource Planner instance. The details are below:</p>`;

    orders.forEach((order: any) => {
      total += order.amountDue;
      html += `<ul>
        <li>Product ID: ${order.materialId.id}</li>
        <li>Product Name: ${order.materialId.name}</li>
        <li>Quantity: ${order.quantity}</li>
        <li>Amount Due: ${order.amountDue}$</li>
        <li>Date Ordered: ${order.dateOrdered.toLocaleDateString('en-US')}</li>
      </ul>`;
    });

    html += `<p><b>Total Paid: ${total}$</b></p>`;

    return html;
  }

  getReceivableEmailHTML(args: {
    email: string;
    orders: ProductOrderDocument[];
  }) {
    let total = 0;
    let html = `<p>An account receivable was <b>paid</b> in your EPIC Resource Planner instance. The details are below:</b>
      <p><b>Customer Email:</b> ${args.email}</p>`;

    args.orders.forEach((order: any) => {
      total += order.amountDue;
      html += `<ul>
        <li>Product ID: ${order.productId.id}</li>
        <li>Product Name: ${order.productId.name}</li>
        <li>Quantity: ${order.quantity}</li>
        <li>Amount Due: ${order.amountDue}$</li>
        <li>Date Ordered: ${order.dateOrdered.toLocaleDateString('en-US')}</li>
      </ul>`;
    });

    html += `<p><b>Total Paid: ${total}$</b></p>`;

    return html;
  }

  @OnEvent(EventMap.ACCOUNT_PAYABLE_PAID.id)
  async handleAccountPayable(orders: MaterialOrderDocument[]) {
    const emails = await getEmails(
      EventMap.ACCOUNT_PAYABLE_PAID,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Account Payable Paid',
        html: this.getPayableEmailHTML(orders),
      });
    }

    this.logger.log(
      'An account payable was paid. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.ACCOUNT_RECEIVABLE_PAID.id)
  async handleAccountReceivable(args: {
    email: string;
    orders: ProductOrderDocument[];
  }) {
    const emails = await getEmails(
      EventMap.ACCOUNT_RECEIVABLE_PAID,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Account Receivable Paid',
        html: this.getReceivableEmailHTML(args),
      });
    }

    this.logger.log(
      'An account receivable was paid. ' + emails.length + ' user(s) notified.',
    );
  }
}
