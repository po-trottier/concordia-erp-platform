import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import {
  ProductLog,
  ProductLogSchema,
} from './products-logs/schemas/product-log.schema';
import { ProductLogsService } from './products-logs/product-logs.service';
import { ProductsController } from './products/products.controller';
import { ProductLogsController } from './products-logs/product-logs.controller';
import { ProductsService } from './products/products.service';
import { Product, ProductSchema } from './products/schemas/products.schema';
import { validate } from '../../shared/env';
import {
  ProductStock,
  ProductStockSchema,
} from './products/schemas/product-stock.schema';
import { LocationsModule } from '../locations/locations.module';
import { PartsModule } from '../parts/parts.module';
import { ProductStockService } from './products/product-stock.service';
import { ProductBuilderService } from './products/product-builder.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductLog.name, schema: ProductLogSchema },
      { name: ProductStock.name, schema: ProductStockSchema },
    ]),
    LocationsModule,
    forwardRef(() => PartsModule),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [ProductLogsController, ProductsController],
  providers: [
    ProductsService,
    ProductLogsService,
    ProductStockService,
    ProductBuilderService,
  ],
  exports: [ProductsService, ProductStockService, MongooseModule],
})
export class ProductsModule {}
