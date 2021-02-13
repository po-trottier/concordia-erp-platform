import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneInternal(username);
    if (user && (await compare(pass, user.password))) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(dto: LoginAuthDto) {
    const user = await this.validateUser(dto.username, dto.password);
    if (!user) {
      return new UnauthorizedException();
    }
    const payload = {
      username: user.username,
      id: user['_id'],
      roles: user.role,
    };
    return {
      name: user.name,
      username: user.username,
      role: user.role,
      token: this.jwtService.sign(payload),
    };
  }
}
