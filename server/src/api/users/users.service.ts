import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../roles/roles.enum';
import { DEFAULT_USER } from '../../shared/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.createDefaultUser();
  }

  // Create default user if he doesn't exist
  async createDefaultUser(): Promise<void> {
    const admin = await this.findOneInternal(DEFAULT_USER);
    if (!admin) {
      const user = new CreateUserDto();
      user.username = DEFAULT_USER;
      user.firstName = 'Administrator';
      user.lastName = 'Person';
      user.email = 'admin@null.com';
      user.role = Role.SYSTEM_ADMINISTRATOR;
      user.password = await hash(process.env.DEFAULT_PASSWORD, 16);
      await this.create(user);
      console.log('Default user was created successfully.');
    } else {
      console.log('Default user already exits.');
    }
  }

  // To be used internally only as it leaks the password hash!
  async findOneInternal(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async create(dto: CreateUserDto): Promise<User> | undefined {
    const account = dto;
    account.username = account.username.trim().toLowerCase();
    account.email = account.email.trim().toLowerCase();
    if (await this.findOneInternal(account.username)) {
      throw new ConflictException(
        'A user with the same username already exists.',
      );
    }
    if (await this.findOneInternal(account.email)) {
      throw new ConflictException('A user with the same email already exists.');
    }

    const createdUser = new this.userModel(account);
    // TODO Generate a random password and send it to the email
    if (!createdUser.password) {
      createdUser.password = await hash(process.env.DEFAULT_PASSWORD, 16);
    }

    const user = await createdUser.save();
    return this.validateUserFound(user, user.username);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    users.forEach((user) => {
      user.password = undefined;
    });
    return users;
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return this.validateUserFound(user, username);
  }

  async update(username: string, dto: UpdateUserDto): Promise<User> {
    // Trim & Lowercase to make search not case-sensitive
    const user = dto;
    if (user.username) {
      user.username = user.username.trim().toLowerCase();
    }
    if (user.email) {
      user.email = user.email.trim().toLowerCase();
    }
    if (user.password) {
      user.password = await hash(user.password, 16);
    }
    // Cannot change the default user's username
    const isAdmin = username === DEFAULT_USER;
    const usernameChanged = dto.username != username;
    const roleChanged = dto.role != Role.SYSTEM_ADMINISTRATOR;
    const adminChanged = usernameChanged || roleChanged;
    if (isAdmin && adminChanged) {
      throw new UnauthorizedException(
        "You cannot change the default user's username.",
      );
    }
    const updatedUser = await this.userModel.findOneAndUpdate(
      { username },
      { ...user },
      { new: true },
    );
    return this.validateUserFound(updatedUser, user.username);
  }

  async remove(username: string): Promise<User> {
    // Cannot delete the default user
    if (username === DEFAULT_USER) {
      throw new UnauthorizedException('You cannot delete the default user.');
    }
    const deletedUser = await this.userModel.findOneAndDelete({ username });
    return this.validateUserFound(deletedUser, username);
  }

  validateUserFound(userResult: any, username: string) {
    if (!userResult) {
      throw new NotFoundException(`User with username "${username}" not found`);
    } else {
      const resp = userResult;
      if (resp.password) {
        resp.password = undefined;
      }
      return resp;
    }
  }
}
