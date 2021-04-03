import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdatePartStockDto } from '../../parts/parts/dto/update-part-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { BuildProductDto } from './dto/build-product.dto';
import { ProductsService } from './products.service';
import { PartStockService } from '../../parts/parts/part-stock.service';
import { ProductStockService } from './product-stock.service';
import { Product } from './schemas/products.schema';

/**
 * Used by the ProductsController, handles product data storage and retrieval.
 */
@Injectable()
export class ProductBuilderService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productStockService: ProductStockService,
    private readonly partStockService: PartStockService,
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
    // checking every build order to see if there are sufficient parts in the db
    // at the same time populate validatedBuildOrders (add product to each object)
    for (const buildOrder of buildOrders) {
      if (!buildOrder.stockBuilt) {
        continue;
      }
      const { stockBuilt, productId } = buildOrder;
      const product = await this.productsService.findOne(productId);
      for (const part of product.parts) {
        const totalPartsCount = part.quantity * stockBuilt;
        const partStock = await this.partStockService.findOne(
          part.partId,
          locationId,
        );
        if (partStock.stock < totalPartsCount) {
          throw new BadRequestException({
            error: 'stock of parts is not sufficient',
          });
        }
      }
      validatedBuildOrders.push({ ...buildOrder, product });
    }

    // completing every build order
    let buildResults = [];
    for (const buildOrder of validatedBuildOrders) {
      const { stockBuilt, productId, product } = buildOrder;
      // update part stock
      const updateProductStockDto: UpdateProductStockDto = {
        productId,
        stockBuilt,
        stockUsed: 0,
      };

      const updatedStock = await this.productStockService.update(locationId, [
        updateProductStockDto,
      ]);

      // update parts stock

      const partUpdates = [];
      for (const part of product.parts) {
        const updatePartStockDto: UpdatePartStockDto = {
          partId: part.partId,
          stockBuilt: 0,
          stockUsed: part.quantity * stockBuilt,
        };
        partUpdates.push(updatePartStockDto);
      }

      await this.partStockService.update(locationId, partUpdates);

      buildResults = buildResults.concat(updatedStock);
    }
    return buildResults;
  }
}
