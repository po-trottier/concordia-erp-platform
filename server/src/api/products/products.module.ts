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
import { UpdateProductLogDto } from './products-logs/dto/update-product-log.dto';

@Module({
  imports: [
    //MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: ProductLog.name, schema: ProductLogSchema },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        imports: [ProductsModule],
        useFactory: (productLogsService: ProductLogsService) => {
          const schema = ProductSchema;
          schema.pre('save', function () {
            console.log('Hello from pre save');
            console.log(this);

            const updateProductLogDto: UpdateProductLogDto = {
              productId: this.id,
              stock: 13,
              built: 13,
              used: 13,
              date: new Date(),
            };

            console.log(updateProductLogDto);
            productLogsService.update(updateProductLogDto);
          });
          return schema;
        },
        inject: [ProductLogsService],
      },
    ]),
  ],
  controllers: [ProductLogsController, ProductsController],
  providers: [
    ProductsService,
    ProductLogsService,
    ProductQuantityUpdatedListener,
  ],
  exports: [ProductLogsService],
})
export class ProductsModule {}
