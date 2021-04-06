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
import { EventID, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class OrderListener {
  private readonly logger = new Logger('OrderListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  @OnEvent(EventID.ACCOUNT_PAYABLE_PAID)
  async handleAccountPayable(order: MaterialOrderDocument) {
    const emails = await getEmails(
      EventID.ACCOUNT_PAYABLE_PAID,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Account Payable Paid',
        html: `<p>An account payable was paid in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          order,
        )}</p>`,
      });
    }

    this.logger.log(
      'An account payable was paid. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.ACCOUNT_RECEIVABLE_PAID)
  async handleAccountReceivable(order: ProductOrderDocument) {
    const emails = await getEmails(
      EventID.ACCOUNT_RECEIVABLE_PAID,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Account Receivable Paid',
        html: `<p>An account receivable was paid in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          order,
        )}</p>`,
      });
    }

    this.logger.log(
      'An account receivable was paid. ' + emails.length + ' user(s) notified.',
    );
  }
}
