import { AuthController } from '../../../src/api/auth/auth.controller';
import { AuthService } from '../../../src/api/auth/auth.service';
import { LoginAuthDto } from '../../../src/api/auth/dto/login-auth.dto';
import { PasswordForgottenDto } from '../../../src/api/auth/dto/password-forgotten.dto';
import { UserDocument } from '../../../src/api/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userDocument: Model<UserDocument>;
  let jwtService: JwtService;

  const dummyResult = {
    firstName: 'System',
    lastName: 'Administrator',
    username: 'admin',
    password: 'Password1!',
    email: 'test@gmail.com',
    role: null,
    token: '123',
  };

  beforeEach(async () => {
    authService = new AuthService(userDocument, jwtService);
    authController = new AuthController(authService);
  });

  describe('login', () => {
    it('Should return the currently logged in user.', async () => {
      const result = dummyResult;

      const loginAuthDto = new LoginAuthDto();
      loginAuthDto.username = result.username;
      loginAuthDto.password = result.password;

      jest
        .spyOn(authService, 'login')
        .mockImplementation(async () => await result);

      expect(await authController.login(loginAuthDto)).toBe(result);
    });
  });

  describe('generate', () => {
    it('Should generate a request to send an email.', async () => {
      const result = {
        result: 'Password reset email sent to ' + dummyResult.email + ' successfully.'
      };

      const passwordForgottenDto = new PasswordForgottenDto();
      passwordForgottenDto.email = dummyResult.email;

      jest
        .spyOn(authService, 'generate')
        .mockImplementation(async () => await result);

      expect(await authController.generate(passwordForgottenDto)).toBe(result);
    });
  });
});
