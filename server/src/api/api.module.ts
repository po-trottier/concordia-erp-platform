import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { ApiController } from './api.controller';
import { PartsModule } from './parts/parts.module';
import { MaterialsModule } from './materials/materials.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './roles/roles.guard';
import { routes } from '../routes';
import { ProductsModule } from './products/products.module';
import { validate } from '../shared/env';
import { DB_NAME, DB_URL } from '../shared/constants';
import { OrdersModule } from './orders/orders.module';
import { LocationsModule } from './locations/locations.module';

const mongoDbUrl = process.env.DB_URL || DB_URL;
const mongoDbName = process.env.DB_NAME || DB_NAME;

@Module({
  imports: [
    MongooseModule.forRoot(`${mongoDbUrl}/${mongoDbName}`, {
      useFindAndModify: false,
    }),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
    // Router Support
    RouterModule.forRoutes(routes),
    PartsModule,
    MaterialsModule,
    AuthModule,
    UsersModule,
    OrdersModule,
    ProductsModule,
    LocationsModule,
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
