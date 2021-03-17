import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format, parse } from 'date-fns';
import { Model } from 'mongoose';
import { UpdateProductLogDto } from '../products-logs/dto/update-product-log.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { ProductLogsService } from '../products-logs/product-logs.service';
import { LocationsService } from '../../locations/locations.service';
import { ProductsService } from './products.service';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ProductLocationStockDocument,
  ProductLocationStock,
} from './schemas/product-location-stock.schema';

/**
 * Used by the ProductsController, handles product location stock data storage and retrieval.
 */
@Injectable()
export class ProductLocationStockService {
  constructor(
    @InjectModel(ProductLocationStock.name)
    private productLocationStockModel: Model<ProductLocationStockDocument>,
    private readonly productsService: ProductsService,
    private readonly productLogsService: ProductLogsService,
    private readonly locationsService: LocationsService,
  ) {}

  /**
   * Retrieves stock info for all products at a certain location
   *
   * @param locationId the id of the location
   */
  async findAll(locationId: string): Promise<ProductLocationStock[]> {
    return this.productLocationStockModel.find({ locationId });
  }

  /**
   * Retrieves the stock info of a certain product at a certain location
   *
   * @param productId the id of the product
   * @param locationId the id of the location
   */
  async findOne(
    productId: string,
    locationId: string,
  ): Promise<ProductLocationStock> {
    let productLocationStock = await this.productLocationStockModel.findOne({
      productId,
      locationId,
    });

    //if stock info is not found, check if product and location are valid
    //and create new entry
    if (!productLocationStock) {
      const product = await this.productsService.findOne(productId);
      const location = await this.locationsService.findOne(locationId);

      if (product && location) {
        productLocationStock = new this.productLocationStockModel({
          product,
          location,
          stock: 0,
        });
        productLocationStock.save();
      }
    }

    return this.validateProductLocationStockFound(
      productLocationStock,
      productId,
      locationId,
    );
  }

  /**
   * Updates product stock by id using mongoose productLocationStockModel
   *
   * @param locationId string of the location's objectId
   * @param updateProductStockDto dto used to update product stock
   */
  async update(
    locationId: string,
    updateProductStockDto: UpdateProductStockDto[],
  ): Promise<ProductLocationStock> {
    const updatedStocks = [];

    for (let i = 0; i < updateProductStockDto.length; i++) {
      const { stockBuilt, stockUsed, productId } = updateProductStockDto[i];

      const netStockChange = stockBuilt - stockUsed;

      if (netStockChange < 0) {
        const currentStock = await this.findOne(
          productId,
          locationId,
        );

        if (currentStock.stock + netStockChange < 0) {
          throw new BadRequestException(
            `This operation would result in negative stock. Current stock: ${currentStock.stock}, netStockChange: ${netStockChange}`,
          );
        }
      }

      const updatedStock = await this.productLocationStockModel
        .findOneAndUpdate(
          { productId, locationId },
          { $inc: { stock: netStockChange } },
          { new: true, upsert: true },
        )
        .populate('productId')
        .exec();

      if (updatedStock) {
        const updateProductLogDto: UpdateProductLogDto = {
          productId,
          locationId,
          stock: updatedStock.stock,
          stockBuilt,
          stockUsed,
          date: parse(format(new Date(), 'd/M/y'), 'dd/MM/yyyy', new Date()),
        };

        await this.productLogsService.update(updateProductLogDto);

        updatedStocks.push(updatedStock);
      }
    }

    return this.validateProductLocationStockFound(
      updatedStocks,
      'many',
      locationId,
    );
  }

  /**
   * Returns NotFoundException if productLocationStock is null, otherwise returns productLocationStock
   *
   * @param productLocationStockResult a retrieved productLocationStock
   * @param productId string of the product's objectId
   * @param locationId string of the location's objectId
   */
  validateProductLocationStockFound(
    productLocationStockResult: any,
    productId: string,
    locationId: string,
  ) {
    if (!productLocationStockResult) {
      throw new NotFoundException(
        `ProductLocationStock with product id ${productId} and location id ${locationId} not found`,
      );
    } else {
      return productLocationStockResult;
    }
  }
}
