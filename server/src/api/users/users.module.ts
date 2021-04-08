import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';
import { EventsModule } from '../events/events.module';
import { UserListener } from '../../events/listeners/user.listener';
import { AuthModule } from '../auth/auth.module';
import { AuditsModule } from '../audits/audits.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Events Listener Dependency
    forwardRef(() => EventsModule),
    forwardRef(() => AuthModule),
    forwardRef(() => AuditsModule),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  providers: [UsersService, UserListener],
  controllers: [UsersController],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
