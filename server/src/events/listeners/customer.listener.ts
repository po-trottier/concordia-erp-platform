import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Event, EventDocument } from '../../api/events/schemas/events.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '../../api/users/schemas/user.schema';
import { CustomerDocument } from '../../api/customers/schemas/customers.schema';
import { EventID, getEmails } from '../common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';

@Injectable()
export class CustomerListener {
  private readonly logger = new Logger('CustomerListener');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  @OnEvent(EventID.CUSTOMER_CREATED)
  async handleCustomerCreated(customer: CustomerDocument) {
    const emails = await getEmails(
      EventID.CUSTOMER_CREATED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] New Customer Created',
        html: `<p>A new customer was created in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          customer,
        )}</p>`,
      });
    }

    this.logger.log(
      'A customer was created. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.CUSTOMER_DELETED)
  async handleCustomerDeleted(customer: CustomerDocument) {
    const emails = await getEmails(
      EventID.CUSTOMER_DELETED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Customer Deleted',
        html: `<p>A customer was deleted in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          customer,
        )}</p>`,
      });
    }

    this.logger.log(
      'A customer was deleted. ' + emails.length + ' user(s) notified.',
    );
  }

  @OnEvent(EventID.CUSTOMER_MODIFIED)
  async handleCustomerModified(customer: CustomerDocument) {
    const emails = await getEmails(
      EventID.CUSTOMER_MODIFIED,
      this.eventModel,
      this.userModel,
    );

    if (emails.length > 0) {
      await Mail.instance.send({
        to: emails,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Customer Modified',
        html: `<p>A customer was modified in your EPIC Resource Planner instance. The details are below:</p><p>${JSON.stringify(
          customer,
        )}</p>`,
      });
    }

    this.logger.log(
      'A customer was modified. ' + emails.length + ' user(s) notified.',
    );
  }
}
