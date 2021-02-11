import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';
import { ApiController } from './api.controller';
import { PartsModule } from './parts/parts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { routes } from '../routes';

const mongoDbUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const mongoDbName = process.env.DB_NAME || 'ERP_db';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    MongooseModule.forRoot(`${mongoDbUrl}/${mongoDbName}`, {
      useFindAndModify: false,
    }),
    PartsModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [ApiController],
})
export class ApiModule {}
