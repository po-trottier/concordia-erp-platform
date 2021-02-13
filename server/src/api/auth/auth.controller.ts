import { Post, Controller, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from '../../shared/public';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body(ValidationPipe) dto: LoginAuthDto) {
    return this.authService.login(dto);
  }
}
