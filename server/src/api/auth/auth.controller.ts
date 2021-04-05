import {
  Body,
  Controller,
  Param,
  Post,
  ValidationPipe,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from '../../shared/public';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { PasswordResetDto } from './dto/password-reset.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body(ValidationPipe) dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('forgot/:token')
  forgot(
    @Param('token') token: string,
    @Body(ValidationPipe) dto: PasswordResetDto,
  ) {
    return this.authService.forgot(dto, token);
  }

  @Roles(Role.ANY)
  @Post('forgot')
  reset(
    @Headers('authorization') auth: string,
    @Body(ValidationPipe) dto: PasswordResetDto,
  ) {
    return this.authService.reset(dto, auth);
  }
}
