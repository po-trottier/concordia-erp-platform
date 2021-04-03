import { UsersController } from '../../../src/api/users/users.controller';
import { UsersService } from '../../../src/api/users/users.service';
import { CreateUserDto } from '../../../src/api/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/api/users/dto/update-user.dto';
import { Role } from '../../../src/api/roles/roles.enum';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../src/api/users/schemas/user.schema';

describe('UsersController', () => {
  jest.setTimeout(30000);

  let usersController: UsersController;
  let usersService: UsersService;
  let userDocumentModel: Model<UserDocument>;

  const dummyUser: User = {
    firstName: 'System',
    lastName: 'Administrator',
    username: 'admin',
    password: 'Password1!',
    email: 'test@gmail.com',
    role: 4,
  };

  beforeEach(() => {
    usersService = new UsersService(userDocumentModel);
    usersController = new UsersController(usersService);
  });

  describe('findAll', () => {
    it('Should return a list of all users', async () => {
      const result: User[] = [dummyUser];
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await usersController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a user by their username', async () => {
      const result: User = dummyUser;

      jest
        .spyOn(usersService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await usersController.findOne(result.username)).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a user', async () => {
      const result: User = dummyUser;

      const newUser = new CreateUserDto();
      newUser.firstName = result.firstName;
      newUser.lastName = result.lastName;
      newUser.username = result.username;
      newUser.password = result.password;
      (newUser.email = result.email),
        (newUser.role = Role.SYSTEM_ADMINISTRATOR);

      jest
        .spyOn(usersService, 'create')
        .mockImplementation(async () => await result);

      expect(await usersController.create(newUser)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should delete a user by their username', async () => {
      const result: User = dummyUser;

      jest
        .spyOn(usersService, 'remove')
        .mockImplementation(async () => await result);

      expect(await usersController.remove(result.username)).toBe(result);
    });
  });

  describe('update', () => {
    it('Should update user attribute values', async () => {
      const result: User = dummyUser;

      const updatedUser = new UpdateUserDto();
      updatedUser.firstName = result.firstName;
      updatedUser.lastName = result.lastName;
      updatedUser.username = result.username;
      updatedUser.password = result.password;
      updatedUser.email = result.email;
      updatedUser.role = 4;

      jest
        .spyOn(usersService, 'update')
        .mockImplementation(async () => await result);

      expect(await usersController.update(result.username, updatedUser)).toBe(
        result,
      );
    });
  });
});
