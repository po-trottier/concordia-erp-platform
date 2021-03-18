import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { UpdatePartStockDto } from '../../parts/parts/dto/update-part-stock.dto';
import { UpdateProductStockDto } from "./dto/update-product-stock.dto";
import { BuildProductDto } from './dto/build-product.dto';
import { ProductsService } from './products.service';
import { PartLocationStockService } from '../../parts/parts/part-location-stock.service';
import {ProductLocationStockService} from './product-location-stock.service';
import {Product, ProductDocument} from './schemas/products.schema';
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
  ): Promise<Object> {
    const validatedBuildOrders: {buildAmount: number, productId: string, product: Product}[] = [];
    // checking every build order to see if there are sufficient parts in the db
    // at the same time populate validatedBuildOrders (add product to each object)
    for (const buildOrder of buildOrders) {
      if (!buildOrder.buildAmount){
        continue;
      }
      const { buildAmount, productId } = buildOrder;
      const product = await this.productsService.findOne(productId);
      for (const part of product.parts) {
        const totalPartsCount = part.quantity * buildAmount;
        const partLocationStock = await this.partLocationStockService.findOne(part.partId, locationId);
        if (partLocationStock.stock < totalPartsCount) {
          throw new BadRequestException({error: 'stock of parts is not sufficient'});
        }
      }
      validatedBuildOrders.push({...buildOrder, product});
    }

    // completing every build order
    const buildResults = [];
    for (const buildOrder of validatedBuildOrders) {
      const { buildAmount, productId, product } = buildOrder;
      // update product stock
      const updateProductStockDto: UpdateProductStockDto = {
        stockBuilt: buildAmount,
        stockUsed: 0
      };

      const updatedProductLocationStock = await this.productLocationStockService.update(
        productId,
        locationId,
        updateProductStockDto,
      );

      // update parts stock
      const updatePartStockDto: UpdatePartStockDto = {
        stockBuilt: 0,
        stockUsed: null
      };

      for (const part of product.parts) {
        updatePartStockDto.stockUsed = part.quantity * buildAmount;
        await this.partLocationStockService.update(
          part.partId,
          locationId,
          updatePartStockDto,
        );
      }

      buildResults.push(updatedProductLocationStock);
    }

    return buildResults;
  }
}
