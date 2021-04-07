import { AuthService } from '../../../src/api/auth/auth.service';
import { UsersService } from '../../../src/api/users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    authService = new AuthService(usersService, jwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
