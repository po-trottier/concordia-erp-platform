import { AuthService } from '../../../src/api/auth/auth.service';
import { UsersService } from '../../../src/api/users/users.service';
import { UserDocument } from '../../../src/api/users/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let userDocumentModel: Model<UserDocument>;
  let jwtService: JwtService;

  beforeEach(async () => {
    usersService = new UsersService(userDocumentModel);
    authService = new AuthService(usersService, jwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
