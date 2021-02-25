import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format, parse } from 'date-fns';
import { Model } from 'mongoose';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { UpdatePartLogDto } from '../parts-logs/dto/update-part-log.dto';
import { UpdatePartStockDto } from './dto/update-part-stock.dto';
import { PartLogsService } from '../parts-logs/part-logs.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Part, PartDocument } from './schemas/part.schema';

/**
 * Used by the PartsController, handles part data storage and retrieval.
 */
@Injectable()
export class PartsService {
  constructor(
    @InjectModel(Part.name) private partModel: Model<PartDocument>,
    private readonly partLogsService: PartLogsService,
  ) {}

  /**
   * Creates part using mongoose partModel
   *
   * @param createPartDto dto used to create parts
   */
  async create(createPartDto: CreatePartDto): Promise<Part> {
    const createdPart = new this.partModel(createPartDto);
    createdPart.save();

    const updatePartLogDto: UpdatePartLogDto = {
      partId: createdPart.id,
      stock: createdPart.stock || 0,
      stockBuilt: 0,
      stockUsed: 0,
      date: parse(format(new Date(), 'd/M/y'), 'dd/MM/yyyy', new Date()),
    };

    await this.partLogsService.update(updatePartLogDto);

    return createdPart;
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
   * Updates part stock by id using mongoose partModel
   * Emits the part.quantity.updated event
   *
   * @param id string of the part's objectId
   * @param updatePartStockDto dto used to update part stock
   */
  async updateStock(
    id: string,
    updatePartStockDto: UpdatePartStockDto,
  ): Promise<Part> {
    const { stockBuilt, stockUsed } = updatePartStockDto;

    const netStockChange = stockBuilt - stockUsed;

    let updatedPart = await this.partModel.findByIdAndUpdate(
      id,
      { $inc: { stock: netStockChange } },
      { new: true },
    );

    if (updatedPart.stock < 0) {
      updatedPart = await this.partModel.findByIdAndUpdate(
        id,
        { $set: { stock: 0 } },
        { new: true },
      );
    }

    if (updatedPart) {
      const updatePartLogDto: UpdatePartLogDto = {
        partId: id,
        stock: updatedPart.stock,
        stockBuilt,
        stockUsed,
        date: parse(format(new Date(), 'd/M/y'), 'dd/MM/yyyy', new Date()),
      };

      await this.partLogsService.update(updatePartLogDto);
    }

    return this.validatePartFound(updatedPart, id);
  }

  /**
   * Deletes part by id using mongoose partModel
   *
   * @param id string of the part's objectId
   */
  async remove(id: string): Promise<Part> {
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
