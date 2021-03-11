import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductLog, ProductLogSchema } from './products-logs/schemas/product-log.schema';
import { ProductLogsService } from './products-logs/product-logs.service';
import { ProductsController } from './products/products.controller';
import { ProductLogsController } from './products-logs/product-logs.controller';
import { ProductsService } from './products/products.service';
import { Product, ProductSchema } from './products/schemas/products.schema';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: ProductLog.name, schema: ProductLogSchema },
    ]),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [ProductLogsController, ProductsController],
  providers: [ProductsService, ProductLogsService],
})
export class ProductsModule {}
