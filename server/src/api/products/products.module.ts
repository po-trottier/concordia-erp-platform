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
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { ProductListener } from '../../events/listeners/product.listener';
import { AuthModule } from '../auth/auth.module';
import { AuditsModule } from '../audits/audits.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductLog.name, schema: ProductLogSchema },
      { name: ProductStock.name, schema: ProductStockSchema },
    ]),
    forwardRef(() => LocationsModule),
    forwardRef(() => PartsModule),
    // Events Listener Dependency
    UsersModule,
    EventsModule,
    AuthModule,
    AuditsModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [ProductLogsController, ProductsController],
  providers: [
    ProductsService,
    ProductLogsService,
    ProductStockService,
    ProductBuilderService,
    ProductListener,
  ],
  exports: [ProductsService, ProductStockService, MongooseModule],
})
export class ProductsModule {}
