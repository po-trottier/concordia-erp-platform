import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isAfter } from 'date-fns';
import { compare, hash } from 'bcryptjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '../users/schemas/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { PasswordForgottenDto } from './dto/password-forgotten.dto';
import { UserToken } from '../../shared/user-token.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mail } from '../../shared/mail';
import {
  CONTACT_EMAIL,
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from '../../shared/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({
      username: username.trim().toLowerCase(),
    });
    if (user && (await compare(pass, user.password))) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(dto: LoginAuthDto) {
    const user = await this.validateUser(dto.username, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid login information.');
    }
    const payload = {
      username: user.username,
      id: user.id,
      roles: user.role,
    };
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
      token: this.jwtService.sign(payload),
    };
  }

  async generate(dto: PasswordForgottenDto) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) {
      throw new NotFoundException('No users exist with the given email.');
    }

    const payload = {
      username: user.username,
      id: user.id,
      roles: user.role,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1d' });
    const baseUrl =
      process.env.NODE_ENV === 'production' ? PRODUCTION_URL : DEVELOPMENT_URL;
    const link = baseUrl + '/reset-password?token=' + token;

    await Mail.instance.send({
      to: dto.email,
      from: CONTACT_EMAIL,
      subject: '[EPIC Resource Planner] Password Reset Link',
      html: `<p>Here is the password reset link you have requested:</p>
        <a href='${link}'>${link}</a>
        <p>The token will expire in 24 hours.</p>`,
    });

    return {
      result: 'Password reset email sent to ' + dto.email + ' successfully.',
    };
  }

  async forgot(dto: PasswordResetDto, urlToken: string) {
    const decoded: any = this.jwtService.decode(urlToken);
    const token: UserToken = decoded;

    const expiry = new Date(decoded.exp * 1000);
    if (isAfter(new Date(), expiry)) {
      throw new BadRequestException('The request has expired.');
    }

    const updateDto: UpdateUserDto = {
      password: await hash(dto.password, 16),
    };

    const user = await this.userModel.findByIdAndUpdate(
      token.id,
      { ...updateDto },
      { new: true },
    );
    if (user) {
      user.password = undefined;
    }
    return user;
  }

  async reset(dto: PasswordResetDto, auth: string) {
    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token: UserToken = decoded;

    const updateDto: UpdateUserDto = {
      password: await hash(dto.password, 16),
    };

    const user = await this.userModel.findByIdAndUpdate(
      token.id,
      { ...updateDto },
      { new: true },
    );
    if (user) {
      user.password = undefined;
    }
    return user;
  }
}
