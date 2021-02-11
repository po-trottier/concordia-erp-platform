import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../exports/Public';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
