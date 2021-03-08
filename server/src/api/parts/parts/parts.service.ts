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
import { LocationsService } from '../../locations/locations.service';

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PartLocationStockDocument,
  PartLocationStock,
} from './schemas/part-location-stock.schema';

/**
 * Used by the PartsController, handles part data storage and retrieval.
 */
@Injectable()
export class PartsService {
  constructor(
    @InjectModel(Part.name) private partModel: Model<PartDocument>,
    @InjectModel(PartLocationStock.name)
    private partLocationStockModel: Model<PartLocationStockDocument>,
    private readonly partLogsService: PartLogsService,
    private readonly locationsService: LocationsService,
  ) {}

  /**
   * Creates part using mongoose partModel
   *
   * @param createPartDto dto used to create parts
   */
  async create(createPartDto: CreatePartDto): Promise<Part> {
    const createdPart = new this.partModel(createPartDto);
    createdPart.save();

    return createdPart;
  }

  /**
   * Retrieves all parts using mongoose partModel
   */
  async findAll(): Promise<Part[]> {
    return this.partModel.find();
  }

  /**
   * Retrieves stock info for all parts at a certain location
   *
   * @param locationId the id of the location
   */
  async findAllStock(locationId: string): Promise<PartLocationStock[]> {
    return this.partLocationStockModel.find({ locationId });
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
   * Retrieves the stock info of a certain part at a certain location
   *
   * @param partId the id of the part
   * @param locationId the id of the location
   */
  async findOneStock(
    partId: string,
    locationId: string,
  ): Promise<PartLocationStock> {
    let partLocationStock = await this.partLocationStockModel.findOne({
      partId,
      locationId,
    });

    //if stock info is not found, check if part and location are valid
    //and create new entry
    if (!partLocationStock) {
      const part = await this.partModel.findById(partId);
      const location = await this.locationsService.findOne(locationId);

      console.log(part, location);

      if (part && location) {
        partLocationStock = new this.partLocationStockModel({
          partId,
          locationId,
          stock: 0,
        });
        partLocationStock.save();
      }
    }

    return this.validatePartLocationStockFound(
      partLocationStock,
      partId,
      locationId,
    );
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
   * @param partId string of the part's objectId
   * @param locationId string of the location's objectId
   * @param updatePartStockDto dto used to update part stock
   */
  async updateStock(
    partId: string,
    locationId: string,
    updatePartStockDto: UpdatePartStockDto,
  ): Promise<Part> {
    const { stockBuilt, stockUsed } = updatePartStockDto;

    const netStockChange = stockBuilt - stockUsed;

    let updatedPartLocationStock = await this.partLocationStockModel.findOneAndUpdate(
      { partId, locationId },
      { $inc: { stock: netStockChange } },
      { new: true, upsert: true },
    );

    if (updatedPartLocationStock.stock < 0) {
      updatedPartLocationStock = await this.partLocationStockModel.findOneAndUpdate(
        { partId, locationId },
        { $set: { stock: 0 } },
        { new: true },
      );
    }

    if (updatedPartLocationStock) {
      const updatePartLogDto: UpdatePartLogDto = {
        partId,
        locationId,
        stock: updatedPartLocationStock.stock,
        stockBuilt,
        stockUsed,
        date: parse(format(new Date(), 'd/M/y'), 'dd/MM/yyyy', new Date()),
      };

      await this.partLogsService.update(updatePartLogDto);
    }

    return this.validatePartLocationStockFound(
      updatedPartLocationStock,
      partId,
      locationId,
    );
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

  validatePartLocationStockFound(
    partLocationStockResult: any,
    partId: string,
    locationId: string,
  ) {
    if (!partLocationStockResult) {
      throw new NotFoundException(
        `Part with id ${partId} not found or Location with id ${locationId} not found`,
      );
    } else {
      return partLocationStockResult;
    }
  }
}
