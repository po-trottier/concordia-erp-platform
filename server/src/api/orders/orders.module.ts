import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';
import { OrdersController } from './orders.controller';
import { MaterialOrdersService } from './material-orders.service';
import {
  MaterialOrder,
  MaterialOrderSchema,
} from './schemas/material-orders.schema';
import {
  ProductOrder,
  ProductOrderSchema,
} from './schemas/product-orders.schema';
import { ProductOrdersService } from './product-orders.service';
import { OrderDetailsService } from './order-details.service';
import { MaterialsService } from '../materials/materials/materials.service';
import { ProductsService } from '../products/products/products.service';
import { ProductsModule } from '../products/products.module';
import { MaterialsModule } from '../materials/materials.module';
import { PartsModule } from '../parts/parts.module';

/**
 * Contains all logic and files related to finance
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MaterialOrder.name, schema: MaterialOrderSchema },
      { name: ProductOrder.name, schema: ProductOrderSchema },
    ]),
    ProductsModule,
    MaterialsModule,
    // Required to fulfill dependencies
    PartsModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [OrdersController],
  providers: [
    MaterialOrdersService,
    ProductOrdersService,
    OrderDetailsService,
    MaterialsService,
    ProductsService,
  ],
})
export class OrdersModule {}
