import { UsersController } from '../../../src/api/users/users.controller';
import { UsersService } from '../../../src/api/users/users.service';
import { CreateUserDto } from '../../../src/api/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/api/users/dto/update-user.dto';
import { Role } from '../../../src/api/roles/roles.enum';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../src/api/users/schemas/user.schema';

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let userDocumentModel: Model<UserDocument>;

    beforeEach(() => {
			usersService = new UsersService(userDocumentModel);
			usersController = new UsersController(usersService);
    });

    describe('findAll', () => {
			it('Should return a list of all users', async () => {
				const result: User[] = [
					{
						firstName: 'System',
						lastName: 'Administrator',
						username: 'admin',
						password: 'Password1!',
						email: 'test@gmail.com',
						role: 4,
					},
			];
				jest.spyOn(usersService, 'findAll').mockImplementation(async () => await result);

				expect(await usersController.findAll()).toBe(result);
			})
    });

    describe('create', () => {
			it('Should create a user', async () => {
				const user: User = {
					firstName: 'John',
					lastName: 'Doe',
					username: 'johnDoe69420',
					password: 'Password1!',
					email: 'jdoeSniper@noscope.com',
					role: 4,
				}

				const newUser = new CreateUserDto();
				newUser.firstName = 'John';
				newUser.lastName = 'Doe';
				newUser.username = 'johnDoe69420';
				newUser.password = 'Password1!';
				newUser.email = 'jdoeSniper@noscope.com',
				newUser.role = Role.SYSTEM_ADMINISTRATOR;
				
				jest.spyOn(usersService, 'create').mockImplementation(async () => await user)

				expect(await usersController.create(newUser)).toBe(user);
			})
    });
});