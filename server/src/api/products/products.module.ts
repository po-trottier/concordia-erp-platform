import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductLog,
  ProductLogSchema,
} from './products-logs/schemas/product-log.schema';
import { ProductLogsService } from './products-logs/product-logs.service';
import { ProductsController } from './products.controller';
import { ProductLogsController } from './products-logs/product-logs.controller';
import { ProductsService } from './products/products.service';
import { Product, ProductSchema } from './products/schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: ProductLog.name, schema: ProductLogSchema },
    ]),
  ],
  controllers: [ProductLogsController, ProductsController],
  providers: [ProductsService, ProductLogsService],
})
export class ProductsModule {}
