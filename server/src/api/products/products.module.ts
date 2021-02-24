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
            const updateProductLogDto: UpdateProductLogDto = {
              productId: this.id,
              stock: this['quantity'],
              built: 0,
              used: 0,
              date: new Date(),
            };
            productLogsService.update(updateProductLogDto);
          });

          schema.pre('findOneAndUpdate', async function () {
            const stockUpdate = this['_update']['$set'].quantity;
            if (!stockUpdate) return;

            const productId = this['_conditions']._id;
            const oldStock = (await productLogsService.findOne(productId))
              .stock;
            const netChange = stockUpdate - oldStock;
            const builtAmount = netChange > 0 ? netChange : 0;
            const usedAmount = netChange < 0 ? -netChange : 0;

            const updateProductLogDto: UpdateProductLogDto = {
              productId: productId,
              stock: stockUpdate,
              built: builtAmount,
              used: usedAmount,
              date: new Date(),
            };
            productLogsService.update(updateProductLogDto);
          });

          return schema;
        },
        inject: [ProductLogsService],
      },
    ]),
  ],
  controllers: [ProductLogsController, ProductsController],
  providers: [ProductsService, ProductLogsService],
  exports: [ProductLogsService],
})
export class ProductsModule {}
