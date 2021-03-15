import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { UpdatePartStockDto } from '../../parts/parts/dto/update-part-stock.dto';
import { UpdateProductStockDto } from "./dto/update-product-stock.dto";
import { BuildProductDto } from './dto/build-product.dto';
import { ProductsService } from './products.service';
import { PartLocationStockService } from '../../parts/parts/part-location-stock.service';
import {ProductLocationStockService} from './product-location-stock.service';

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
   * @param productId id of the product
   * @param locationId id of the location
   * @param buildProductDto
   */
  async build(
    productId: string,
    locationId: string,
    buildProductDto: BuildProductDto,
  ): Promise<Object> {
    const { stockBuilt } = buildProductDto;

    // checking if we can do the operation
    const product = await this.productsService.findOne(productId);
    for (let i = 0; i < product.parts.length; i++) {
      const part = product.parts[i];
      const totalPartsCount = part.quantity * stockBuilt;
      const partLocationStock = await this.partLocationStockService.findOne(
        part.partId,
        locationId,
      );
      if (partLocationStock.stock < totalPartsCount) {
        throw new BadRequestException({error: 'stock of parts is not sufficient'});
      }
    }

    // update product stock
    const updateProductStockDto: UpdateProductStockDto = {
      stockBuilt: stockBuilt,
      stockUsed: 0
    };

    const updatedProductLocationStock = await this.productLocationStockService.update(
      productId,
      locationId,
      updateProductStockDto,
    );

    // update parts stock
    const updatedPartLocationStocks = [];
    const updatePartStockDto: UpdatePartStockDto = {
      stockBuilt: 0,
      stockUsed: null
    };

    for (let i = 0; i < product.parts.length; i++) {
      const part = product.parts[i];
      updatePartStockDto.stockUsed = part.quantity * stockBuilt;
      const updatedPartLocationStock = await this.partLocationStockService.update(
        part.partId,
        locationId,
        updatePartStockDto,
      );
      updatedPartLocationStocks.push(updatedPartLocationStock);
    }
    return { updatedProductLocationStock, updatedPartLocationStocks };
  }
}
