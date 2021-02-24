import { UsersController } from '../../../src/api/users/users.controller';
import { UsersService } from '../../../src/api/users/users.service';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../src/api/users/schemas/user.schema';

describe('UsersController', () => {
    let usersController : UsersController;
    let usersService : UsersService;
    let userDocumentModel : Model<UserDocument>;

    beforeEach(() => {
        usersService = new UsersService(userDocumentModel);
        usersController = new UsersController(usersService);
    });

    describe('findAll', () => {
        it('Should return a list of all users', async () => {
            const result : User[] = [
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
});