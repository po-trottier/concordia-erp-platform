import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApiController } from './api.controller';
import { PartsModule } from './parts/parts.module';
import { FinanceModule } from './finance/finance.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './roles/roles.guard';
import { routes } from '../routes';
import { ProductsModule } from './products/products.module';

const mongoDbUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const mongoDbName = process.env.DB_NAME || 'ERP_db';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    MongooseModule.forRoot(`${mongoDbUrl}/${mongoDbName}`, {
      useFindAndModify: false,
    }),
    EventEmitterModule.forRoot(),
    PartsModule,
    AuthModule,
    UsersModule,
    FinanceModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [ApiController],
})
export class ApiModule {}
