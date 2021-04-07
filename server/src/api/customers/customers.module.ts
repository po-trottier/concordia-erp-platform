import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer, CustomerSchema } from './schemas/customers.schema';
import { CustomerListener } from '../../events/listeners/customer.listener';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { validate } from '../../shared/env';

/**
 * Contains all logic and files related to Customer
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    // Events Listener Dependency
    UsersModule,
    EventsModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [CustomersController],
  providers: [CustomersService, CustomerListener],
  exports: [CustomersService],
})
export class CustomersModule {}
