import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { UpdatePartStockDto } from '../../parts/parts/dto/update-part-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { BuildProductDto } from './dto/build-product.dto';
import { ProductsService } from './products.service';
import { PartLocationStockService } from '../../parts/parts/part-location-stock.service';
import { ProductLocationStockService } from './product-location-stock.service';
import {Product, ProductDocument} from './schemas/products.schema';
import { Model } from 'mongoose';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PartLocationStockDocument,
  PartLocationStock,
} from '../../parts/parts/schemas/part-location-stock.schema';
import { InjectModel } from '@nestjs/mongoose';
/**
 * Used by the ProductsController, handles product data storage and retrieval.
 */
@Injectable()
export class ProductBuilderService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productLocationStockService: ProductLocationStockService,
    private readonly partLocationStockService: PartLocationStockService,
  ) {}

  /**
   * builds a product if enough parts are present
   *
   * @param locationId id of the location to build for
   * @param buildOrders buildOrderDtos containing productId and stockBuilt
   */
  async build(
    locationId: string,
    buildOrders: BuildProductDto[],
  ): Promise<any> {
    const validatedBuildOrders: {
      stockBuilt: number;
      productId: string;
      product: Product;
    }[] = [];
    const productsCache = [];

    // checking every build order to see if there are sufficient parts in the db
    // at the same time populate validatedBuildOrders (add product to each object)
    for (const buildOrder of buildOrders) {
      if (!buildOrder.stockBuilt){
        continue;
      }
      const { stockBuilt, productId } = buildOrder;
      const product = await this.productsService.findOne(productId);
      productsCache.push(product);
      for (const part of product.parts) {
        const totalPartsCount = part.quantity * stockBuilt;
        const partLocationStock = await this.partLocationStockService.findOne(
          part.partId,
          locationId,
        );
        if (partLocationStock.stock < totalPartsCount) {
          throw new BadRequestException({
            error: 'stock of parts is not sufficient',
          });
        }
      }
      validatedBuildOrders.push({ ...buildOrder, product });
    }

    const updatedProductLocationStock = await this.productLocationStockService.update(
      locationId,
      buildOrders.map((o) => ({
        productId: o.productId,
        stockBuilt: o.stockBuilt,
        stockUsed: 0,
      })),
    );

    for (const product of productsCache) {
      const order = buildOrders.find((o) => o.productId === product._id);
      if (!order) {
        continue;
      }
      await this.partLocationStockService.update(
        locationId,
        product.parts.map((p) => ({
          partId: p.partId,
          stockUsed: p.quantity * order.stockBuilt,
          stockBuilt: 0,
        })),
      );
    }

    return updatedProductLocationStock;
  }
}
