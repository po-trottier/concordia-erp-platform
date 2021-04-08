import { AuthService } from '../../../src/api/auth/auth.service';
import { UserDocument } from '../../../src/api/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let authService: AuthService;
  let userDocument: Model<UserDocument>;
  let jwtService: JwtService;

  beforeEach(async () => {
    authService = new AuthService(userDocument, jwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
