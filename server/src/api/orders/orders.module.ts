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
import {
  Material,
  MaterialSchema,
} from '../materials/materials/schemas/material.schema';
import { MaterialsService } from '../materials/materials/materials.service';
import {
  MaterialLog,
  MaterialLogSchema,
} from '../materials/materials-logs/schemas/material-log.schema';
import { MaterialLogsService } from '../materials/materials-logs/material-logs.service';

/**
 * Contains all logic and files related to finance
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MaterialOrder.name, schema: MaterialOrderSchema },
      { name: ProductOrder.name, schema: ProductOrderSchema },
      { name: Material.name, schema: MaterialSchema },
      { name: MaterialLog.name, schema: MaterialLogSchema },
    ]),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [OrdersController],
  providers: [
    MaterialOrdersService,
    ProductOrdersService,
    MaterialsService,
    MaterialLogsService,
  ],
})
export class OrdersModule {}
