import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer, CustomerSchema } from './schemas/customers.schema';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';

/**
 * Contains all logic and files related to Customer
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
