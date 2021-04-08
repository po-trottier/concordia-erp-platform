import { UsersService } from '../../../src/api/users/users.service';
import { Model } from 'mongoose';
import { UserDocument } from '../../../src/api/users/schemas/user.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('UsersService', () => {
  let usersService: UsersService;
  let userDocumentModel: Model<UserDocument>;
  let emitter: EventEmitter2;

  beforeEach(async () => {
    usersService = new UsersService(emitter, userDocumentModel);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });
});
