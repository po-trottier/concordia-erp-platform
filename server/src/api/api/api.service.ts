import { OnApplicationBootstrap } from '@nestjs/common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';
import { SendEmailDto } from './dto/send-email.dto';

export class ApiService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    Mail.initialize();
  }

  getStatus() {
    return { status: 'Running' };
  }

  testEmail(dto: SendEmailDto) {
    return Mail.instance
      .send({
        to: dto.email,
        from: CONTACT_EMAIL,
        subject: 'API Test Email',
        html: '<p>This is a <strong>test</strong> email.</p>',
      })
      .then(() => {
        return { result: 'Email sent to ' + dto.email + ' successfully.' };
      })
      .catch((err) => {
        throw err;
      });
  }
}
