import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // To be used internally only as it leaks the password hash!
  async findOneInternal(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async create(dto: CreateUserDto): Promise<User> | undefined {
    if (await this.userModel.findOne({ username: dto.username })) {
      return undefined;
    }
    const createdUser = new this.userModel(dto);
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
    const updatedUser = await this.userModel.findOneAndUpdate(
      { username },
      { $set: { ...dto } },
      { new: true },
    );
    return this.validateUserFound(updatedUser, username);
  }

  async remove(username: string): Promise<User> {
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
