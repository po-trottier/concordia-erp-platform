import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JWT_SECRET } from '../../shared/constants';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
    // JWT Support
    JwtModule.register({
      secret: process.env.JWT_SECRET || JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {
}
