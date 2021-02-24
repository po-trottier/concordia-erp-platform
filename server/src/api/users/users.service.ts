import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  OnApplicationBootstrap,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Role } from '../roles/roles.enum';
import { DEFAULT_USER } from '../../shared/constants';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  async onApplicationBootstrap(): Promise<void> {
    await this.createDefaultUser();
  }

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create default user if he doesn't exist
  async createDefaultUser(): Promise<void> {
    try {
      const admin = await this.findOne(DEFAULT_USER);
      if (admin) {
        console.log('Default user already exits.');
      }
    } catch (err) {
      if (err.status == 404) {
        const user = new CreateUserDto();
        user.username = DEFAULT_USER;
        user.name = 'Administrator';
        user.role = Role.SYSTEM_ADMINISTRATOR;
        user.password = await hash(process.env.DEFAULT_PASSWORD, 16);
        await this.create(user);
        console.log('Default user was created successfully.');
      } else {
        console.error(
          'Something went wrong while creating the default user.',
          err,
        );
      }
    }
  }

  // To be used internally only as it leaks the password hash!
  async findOneInternal(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async create(dto: CreateUserDto): Promise<User> | undefined {
    const account = dto;
    account.username = account.username.trim().toLowerCase();
    if (await this.findOneInternal(account.username)) {
      throw new ConflictException(
        'A user with the same username already exists.',
      );
    }
    const createdUser = new this.userModel(account);
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
    // Cannot change the default user's username
    const isAdmin = username === DEFAULT_USER;
    const adminChanged =
      dto.username != username || dto.role != Role.SYSTEM_ADMINISTRATOR;
    if (isAdmin && adminChanged) {
      throw new UnauthorizedException(
        "You cannot change the default user's username.",
      );
    }
    const updatedUser = await this.userModel.findOneAndUpdate(
      { username },
      { $set: { ...dto } },
      { new: true },
    );
    return this.validateUserFound(updatedUser, username);
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
