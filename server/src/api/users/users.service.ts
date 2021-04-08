import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  OnApplicationBootstrap,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../roles/roles.enum';
import { DEFAULT_USER } from '../../shared/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from './schemas/user.schema';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';
import { EventMap } from '../../events/common';
import {UserToken} from "../../shared/user-token.interface";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private jwtService: JwtService,
    private emitter: EventEmitter2,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.createDefaultUser();
  }

  // Create default user if he doesn't exist
  async createDefaultUser(): Promise<void> {
    const admin = await this.userModel.findOne({ username: DEFAULT_USER });
    if (!admin) {
      const user: any = new CreateUserDto();
      user.username = DEFAULT_USER;
      user.firstName = 'Administrator';
      user.lastName = 'Person';
      user.email = 'admin@null.com';
      user.role = Role.SYSTEM_ADMINISTRATOR;
      user.password = await hash(process.env.DEFAULT_PASSWORD, 16);
      await this.create(this.jwtService.sign({
        username: 'system',
        id: '666',
        role: Role.SYSTEM_ADMINISTRATOR,
      }),user);
      this.logger.log('Default user was created successfully');
    } else {
      this.logger.warn('Default user already exits');
    }
  }

  async create(auth: string, dto: CreateUserDto): Promise<User> | undefined {
    const account = dto;
    account.username = account.username.trim().toLowerCase();
    account.email = account.email.trim().toLowerCase();
    if (await this.userModel.findOne({ username: account.username })) {
      throw new ConflictException(
        'A user with the same username already exists.',
      );
    }
    if (await this.userModel.findOne({ email: account.email })) {
      throw new ConflictException('A user with the same email already exists.');
    }

    const createdUser = new this.userModel(account);

    if (!createdUser.password) {
      const allowedChars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#?!@$%&';
      const passwordLength = 14;
      const randomPassword = Array(passwordLength)
        .fill(allowedChars)
        .map(function (x) {
          return x[Math.floor(Math.random() * x.length)];
        })
        .join('');
      createdUser.password = await hash(randomPassword, 16);

      Mail.instance
        .send({
          to: createdUser.email,
          from: CONTACT_EMAIL,
          subject: '[EPIC Resource Planner] New User Password',
          html: `<p>The new password for username <strong>${createdUser.username}</strong> is:</p><p><strong>${randomPassword}</strong></p><p>We encourage you to reset that password when first logging in.</p>`,
        })
        .then(() => {
          return {
            result: 'Email sent to ' + createdUser.email + ' successfully.',
          };
        })
        .catch((err) => {
          throw err;
        });
    }

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const user = await createdUser.save();
    user.password = undefined;
    this.emitter.emit(EventMap.USER_CREATED.id, {user, token});
    return user;
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

  async update(auth: string, username: string, dto: UpdateUserDto): Promise<User> {
    // Trim & Lowercase to make search not case-sensitive
    const newUser = dto;
    if (newUser.username) {
      newUser.username = newUser.username.trim().toLowerCase();
    }
    if (newUser.email) {
      newUser.email = newUser.email.trim().toLowerCase();
    }
    if (newUser.password) {
      newUser.password = await hash(newUser.password, 16);
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
      { ...newUser },
      { new: true },
    );

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const user = this.validateUserFound(updatedUser, newUser.username);
    this.emitter.emit(EventMap.USER_MODIFIED.id, {user, token});
    return user;
  }

  async remove(auth: string, username: string): Promise<User> {
    // Cannot delete the default user
    if (username === DEFAULT_USER) {
      throw new UnauthorizedException('You cannot delete the default user.');
    }
    const deletedUser = await this.userModel.findOneAndDelete({ username });

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const user = this.validateUserFound(deletedUser, username);
    this.emitter.emit(EventMap.USER_DELETED.id, {user, token});
    return user;
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
