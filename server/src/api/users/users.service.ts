import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(username: string): Promise<User> {
    const part = await this.userModel.findOne({ username });
    return this.validateUserFound(part, username);
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

  validateUserFound(partResult: any, username: string) {
    if (!partResult) {
      throw new NotFoundException(`User with username "${username}" not found`);
    } else {
      const response = partResult;
      delete response.password;
      return response;
    }
  }
}
