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
import {
  Material,
  MaterialSchema,
} from '../materials/materials/schemas/material.schema';
import {
  Product,
  ProductSchema,
} from '../products/products/schemas/products.schema';
import { ProductOrdersService } from './product-orders.service';
import { OrderDetailsService } from './order-details.service';
import { MaterialsService } from '../materials/materials/materials.service';
import { ProductsService } from '../products/products/products.service';

/**
 * Contains all logic and files related to finance
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
      { name: Product.name, schema: ProductSchema },
      { name: MaterialOrder.name, schema: MaterialOrderSchema },
      { name: ProductOrder.name, schema: ProductOrderSchema },
    ]),
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
