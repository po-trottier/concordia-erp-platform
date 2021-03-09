import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';
import { ProductOrder, OrderSchema } from './schemas/orders.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

/**
 * Contains all logic and files related to finance
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductOrder.name, schema: OrderSchema },
    ]),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
