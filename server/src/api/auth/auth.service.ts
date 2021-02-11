import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneInternal(username);
    if (user && (await compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const valid = await this.validateUser(user.username, user.password);
    if (!valid) {
      return new UnauthorizedException();
    }
    const payload = { username: valid.username, sub: valid.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
