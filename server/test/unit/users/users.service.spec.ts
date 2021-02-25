import { UsersService } from '../../../src/api/users/users.service';
import { Model } from 'mongoose';
import { UserDocument } from '../../../src/api/users/schemas/user.schema';

describe('UsersService', () => {
  let usersService: UsersService;
  let userDocumentModel: Model<UserDocument>;

  beforeEach(async () => {
    usersService = new UsersService(userDocumentModel);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });
});
