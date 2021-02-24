import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProductLogDto } from './dto/update-product-log.dto';
import { ProductLogDocument, ProductLog } from './schemas/product-log.schema';

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
  async findAll(): Promise<ProductLog[]> {
    return this.productLogModel.find();
  }

  /**
   * Updates productLog by id using mongoose productLogModel
   * If stock is product of the update, emits the product.quantity.updated event
   *
   * @param updateProductLogDto dto used to update product logs
   */
  async update(updateProductLogDto: UpdateProductLogDto): Promise<ProductLog> {
    const { productId, date, stock, built, used } = updateProductLogDto;
    const updatedProductLog = await this.productLogModel.findOneAndUpdate(
      { productId, date },
      { stock, built, used },
      { new: true, upsert: true },
    );

    return this.validateProductLogFound(updatedProductLog, productId, date);
  }

  async findOne(productId: string): Promise<ProductLog> {
    const productLog = await this.productLogModel.findOne({
      productId: productId,
    });
    return this.validateProductLogFound(productLog, productId, productLog.date);
  }

  /**
   * Returns NotFoundException if productLog is null, otherwise returns productLog
   *
   * @param productLogResult a retrieved product
   * @param productId the id of the corresponding product
   * @param date the date in history
   */
  validateProductLogFound(
    productLogResult: any,
    productId: string,
    date: Date,
  ) {
    if (!productLogResult) {
      throw new NotFoundException(
        `ProductLog entry with productId ${productId} on ${date} not found`,
      );
    } else {
      return productLogResult;
    }
  }
}
