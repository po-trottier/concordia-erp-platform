import { Logger } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';

/**
 * Singleton Mail class to send emails from a single
 * instance and avoid multiple initializations.
 */
export class Mail extends MailService {
  static instance: Mail;

  logger = new Logger('MailHelper');

  static initialize() {
    Mail.instance = new Mail();

    const key = process.env.SENDGRID_API_KEY;
    const valid = new RegExp(/SG\..*/);

    if (!key || !valid.test(key)) {
      Mail.instance.logger.error('SendGrid API Key is Invalid');
      return;
    }

    try {
      Mail.instance.setApiKey(process.env.SENDGRID_API_KEY);
      Mail.instance.logger.log('SendGrid successfully initialized');
    } catch (err) {
      Mail.instance.logger.error(
        'Something went wrong while initializing SendGrid',
      );
    }
  }
}
