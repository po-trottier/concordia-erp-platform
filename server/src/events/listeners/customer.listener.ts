import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '../../api/users/schemas/user.schema';
import { CustomerDocument } from '../../api/customers/schemas/customers.schema';
import { EventMap, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class CustomerListener {
  private readonly logger = new Logger('CustomerListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  getEmailHTML(customer: CustomerDocument, action: string) {
    return `<p>A customer was <b>${action}</b> in your EPIC Resource Planner instance. The details are below:</p>
      <ul>
        <li><b>ID:</b> ${customer.id}</li>
        <li><b>Name:</b> ${customer.name}</li>
        <li><b>Email:</b> ${customer.email}</li>
      </ul>`;
  }

  @OnEvent(EventMap.CUSTOMER_CREATED.id)
  async handleCustomerCreated(customer: CustomerDocument) {
    const emails = await getEmails(
      EventMap.CUSTOMER_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Customer Created',
        html: this.getEmailHTML(customer, 'created'),
      });
    }

    this.logger.log(
      'A customer was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.CUSTOMER_DELETED.id)
  async handleCustomerDeleted(customer: CustomerDocument) {
    const emails = await getEmails(
      EventMap.CUSTOMER_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Customer Deleted',
        html: this.getEmailHTML(customer, 'deleted'),
      });
    }

    this.logger.log(
      'A customer was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventMap.CUSTOMER_MODIFIED.id)
  async handleCustomerModified(customer: CustomerDocument) {
    const emails = await getEmails(
      EventMap.CUSTOMER_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Customer Modified',
        html: this.getEmailHTML(customer, 'modified'),
      });
    }

    this.logger.log(
      'A customer was modified. ' + emails.length + ' user(s) notified.',
    );
  }
}
