import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Part, PartDocument } from './schemas/part.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Product,
  ProductDocument,
} from '../../products/products/schemas/products.schema';
import {
  PartStock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PartStockDocument,
} from './schemas/part-stock.schema';
import {
  PartLog,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PartLogDocument,
} from '../parts-logs/schemas/part-log.schema';

/**
 * Used by the PartsController, handles part data storage and retrieval.
 */
@Injectable()
export class PartsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(Part.name)
    private partModel: Model<PartDocument>,
    @InjectModel(PartLog.name)
    private partLogModel: Model<PartLogDocument>,
    @InjectModel(PartStock.name)
    private partStockModel: Model<PartStockDocument>,
  ) {}

  /**
   * Creates part using mongoose partModel
   *
   * @param createPartDto dto used to create parts
   */
  async create(createPartDto: CreatePartDto): Promise<Part> {
    const createdPart = new this.partModel(createPartDto);
    return await createdPart.save();
  }

  /**
   * Retrieves all parts using mongoose partModel
   */
  async findAll(): Promise<Part[]> {
    return this.partModel.find();
  }

  /**
   * Retrieves a part by id using mongoose partModel
   *
   * @param id string of the part's objectId
   */
  async findOne(id: string): Promise<Part> {
    const part = await this.partModel.findById(id);
    return this.validatePartFound(part, id);
  }

  /**
   * Updates part by id using mongoose partModel
   *
   * @param id string of the part's objectId
   * @param updatePartDto dto used to update parts
   */
  async update(id: string, updatePartDto: UpdatePartDto): Promise<Part> {
    const updatedPart = await this.partModel.findByIdAndUpdate(
      id,
      { $set: { ...updatePartDto } },
      { new: true },
    );

    return this.validatePartFound(updatedPart, id);
  }

  /**
   * Deletes part by id using mongoose partModel
   *
   * @param id string of the part's objectId
   */
  async remove(id: string): Promise<Part> {
    //make sure no product depends on the part
    const dependentProducts = await this.productModel.find({
      'parts.partId': id,
    });

    if (dependentProducts.length > 0) {
      throw new ForbiddenException(
        'One or more productsts (' +
          dependentProducts.map((p: Product) => p.name).join(', ') +
          ') use the product you are trying to delete.',
      );
    }

    //Delete all stock entries for the part
    const stocks = await this.partStockModel.find({ partId: id });
    for (const stock of stocks) {
      await stock.delete();
    }

    //Remove the logs for this part
    const logs = await this.partLogModel.find({ partId: id });
    for (const log of logs) {
      await log.delete();
    }

    //Finally, remove the part
    const deletedPart = await this.partModel.findByIdAndDelete(id);
    return this.validatePartFound(deletedPart, id);
  }

  /**
   * Returns NotFoundException if part is null, otherwise returns part
   *
   * @param partResult a retrieved part
   * @param id string of the part's objectId
   */
  validatePartFound(partResult: any, id: string) {
    if (!partResult) {
      throw new NotFoundException(`Part with id ${id} not found`);
    } else {
      return partResult;
    }
  }
}
