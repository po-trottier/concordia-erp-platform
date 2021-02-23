import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { Product, ProductSchema } from './products/schemas/products.schema';
import { ProductLogsController } from './products-logs/product-logs.controller';
import {
  ProductLog,
  ProductLogSchema,
} from './products-logs/schemas/product-log.schema';
import { ProductLogsService } from './products-logs/product-logs.service';
import { ProductQuantityUpdatedListener } from './products-logs/listeners/product-quantity-updated.listener';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: ProductLog.name, schema: ProductLogSchema },
    ]),
  ],
  controllers: [ProductLogsController, ProductsController],
  providers: [
    ProductsService,
    ProductLogsService,
    ProductQuantityUpdatedListener,
  ],
})
export class ProductsModule {}
