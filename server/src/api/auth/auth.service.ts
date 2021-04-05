import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { Role } from '../roles/roles.enum';
import { UpdateUserDto } from '../users/dto/update-user.dto';

interface UserToken {
  username: string;
  id: string;
  role: Role;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneInternal(
      username.trim().toLowerCase(),
    );
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
      id: user['_id'],
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

  async forgot(dto: PasswordResetDto, token: string) {
    console.log(token, dto);
  }

  async reset(dto: PasswordResetDto, auth: string) {
    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token: UserToken = decoded;
    const updateDto: UpdateUserDto = {
      password: await hash(dto.password, 16),
    };
    const user = await this.usersService.updateInternal(token.id, updateDto);
    user.password = undefined;
    return user;
  }
}
