import { AuthController } from '../../../src/api/auth/auth.controller';
import { AuthService } from '../../../src/api/auth/auth.service';
import { LoginAuthDto } from '../../../src/api/auth/dto/login-auth.dto';
import { UsersService } from '../../../src/api/users/users.service';
import { UserDocument } from '../../../src/api/users/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  
  let authController: AuthController;
  let authService: AuthService;
	let usersService: UsersService;
  let userDocumentModel: Model<UserDocument>;
	let jwtService: JwtService;

  beforeEach(async () => {
		usersService = new UsersService(userDocumentModel);
    authService = new AuthService(usersService, jwtService);
    authController = new AuthController(authService);
  });

  describe('login', () => {
    it('Should return a list of all parts', async () => {
			const result = {
				firstName: 'System',
				lastName: 'Administrator',
				username: 'admin',
				password: 'Password1!',
				email: 'test@gmail.com',
				role: null,
				token: '123'
			}

			const loginAuthDto = new LoginAuthDto();
			loginAuthDto.username = result.username;
			loginAuthDto.password = result.password;

      jest.spyOn(authService, 'login').mockImplementation(async () => await result);

      expect(await authController.login(loginAuthDto)).toBe(result);
    });
  });
});
