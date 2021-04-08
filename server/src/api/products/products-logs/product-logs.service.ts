import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProductLogDto } from './dto/update-product-log.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProductLog, ProductLogDocument } from './schemas/product-log.schema';
import { addPredictions } from '../../../shared/predictions';

/**
 * Handles productLog data storage and retrieval.
 */
@Injectable()
export class ProductLogsService {
  constructor(
    @InjectModel(ProductLog.name)
    private productLogModel: Model<ProductLogDocument>,
  ) {}

  /**
   * Retrieves all productLog entries using mongoose productLogModel
   */
  async findAll(locationId: string): Promise<ProductLog[]> {
    const products = await this.productLogModel
      .find({ locationId })
      .sort('productId')
      .sort('date')
      .populate('productId')
      .exec();
    return addPredictions(products, 'productId');
  }

  /**
   * Retrieves a productLog by composite key using mongoose productLogModel
   *
   * @param locationId the id of the location
   * @param productId the id of the corresponding product
   */
  async findOne(locationId: string, productId: string): Promise<ProductLog[]> {
    return await this.productLogModel
      .find({ productId, locationId })
      .populate('productId')
      .exec();
  }

  /**
   * Updates productLog by id using mongoose productLogModel
   * If stock is product of the update, emits the product.quantity.updated event
   *
   * @param updateProductLogDto dto used to update product logs
   */
  async update(updateProductLogDto: UpdateProductLogDto): Promise<ProductLog> {
    const {
      productId,
      locationId,
      date,
      stock,
      stockBuilt,
      stockUsed,
    } = updateProductLogDto;

    const updatedProductLog = await this.productLogModel.findOneAndUpdate(
      { productId, locationId, date },
      { $set: { stock }, $inc: { stockBuilt, stockUsed } },

      { new: true, upsert: true },
    );

    return this.validateProductLogFound(
      updatedProductLog,
      productId,
      locationId,
      date.toString(),
    );
  }

  /**
   * Returns NotFoundException if productLog is null, otherwise returns productLog
   *
   * @param productLogResult a retrieved product
   * @param productId the id of the corresponding product
   * @param locationId the id the location
   * @param date the date in history
   */
  validateProductLogFound(
    productLogResult: any,
    productId: string,
    locationId: string,
    date: string,
  ) {
    if (!productLogResult) {
      throw new NotFoundException(
        `ProductLog entry with productId ${productId} and locationId ${locationId} on ${date} not found`,
      );
    } else {
      return productLogResult;
    }
  }
}
