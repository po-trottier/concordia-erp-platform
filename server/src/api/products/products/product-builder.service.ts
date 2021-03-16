import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { UpdatePartStockDto } from '../../parts/parts/dto/update-part-stock.dto';
import { UpdateProductStockDto } from "./dto/update-product-stock.dto";
import { BuildProductDto } from './dto/build-product.dto';
import { ProductsService } from './products.service';
import { PartLocationStockService } from '../../parts/parts/part-location-stock.service';
import {ProductLocationStockService} from './product-location-stock.service';
import { Model } from 'mongoose';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PartLocationStockDocument,
  PartLocationStock,
} from '../../parts/parts/schemas/part-location-stock.schema';
import {Product, ProductDocument} from './schemas/products.schema';
import {InjectModel} from "@nestjs/mongoose";
import {ProductLocationStock, ProductLocationStockDocument} from "./schemas/product-location-stock.schema";

/**
 * Used by the ProductsController, handles product data storage and retrieval.
 */
@Injectable()
export class ProductBuilderService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(ProductLocationStock.name) private productLocationStockModel: Model<ProductLocationStockDocument>,
    @InjectModel(PartLocationStock.name) private partLocationStockModel: Model<PartLocationStockDocument>,
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
    locationId: string,
    buildOrders: BuildProductDto[],
  ): Promise<Object> {
    for(const buildOrder of buildOrders) {
      const { stockBuilt, productId } = buildOrder;
      console.log(stockBuilt, productId);

      // checking if we can do the operation
      const product = await this.productsService.findOne(productId);
      for (const part of product.parts) {
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
      const session = await this.productModel.startSession();
      session.endSession();

      const updatedPartLocationStocks = [];
      const updatePartStockDto: UpdatePartStockDto = {
        stockBuilt: 0,
        stockUsed: null
      };

      for (const part of product.parts) {
        updatePartStockDto.stockUsed = part.quantity * stockBuilt;
        const updatedPartLocationStock = await this.partLocationStockService.update(
          part.partId,
          locationId,
          updatePartStockDto,
        );
        updatedPartLocationStocks.push(updatedPartLocationStock);
      }
    }

    /*
    return { updatedProductLocationStock, updatedPartLocationStocks };
    */
    return 'Fuck';
  }
}
