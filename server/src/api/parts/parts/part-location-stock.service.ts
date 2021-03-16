import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format, parse } from 'date-fns';
import { Model } from 'mongoose';
import { UpdatePartLogDto } from '../parts-logs/dto/update-part-log.dto';
import { UpdatePartStockDto } from './dto/update-part-stock.dto';
import { PartLogsService } from '../parts-logs/part-logs.service';
import { LocationsService } from '../../locations/locations.service';
import { PartsService } from './parts.service';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PartLocationStockDocument,
  PartLocationStock,
} from './schemas/part-location-stock.schema';

/**
 * Used by the PartsController, handles part location stock data storage and retrieval.
 */
@Injectable()
export class PartLocationStockService {
  constructor(
    @InjectModel(PartLocationStock.name)
    private partLocationStockModel: Model<PartLocationStockDocument>,
    private readonly partsService: PartsService,
    private readonly partLogsService: PartLogsService,
    private readonly locationsService: LocationsService,
  ) {}

  /**
   * Retrieves stock info for all parts at a certain location
   *
   * @param locationId the id of the location
   */
  async findAll(locationId: string): Promise<PartLocationStock[]> {
    return this.partLocationStockModel.find({ locationId });
  }

  /**
   * Retrieves the stock info of a certain part at a certain location
   *
   * @param partId the id of the part
   * @param locationId the id of the location
   */
  async findOne(
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
      const part = await this.partsService.findOne(partId);
      const location = await this.locationsService.findOne(locationId);

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
   * Updates part stock by id using mongoose partLocationStockModel
   *
   * @param partId string of the part's objectId
   * @param locationId string of the location's objectId
   * @param updatePartStockDto dto used to update part stock
   */
  async update(
    partId: string,
    locationId: string,
    updatePartStockDto: UpdatePartStockDto,
  ): Promise<PartLocationStock> {
    const { stockBuilt, stockUsed } = updatePartStockDto;

    const netStockChange = stockBuilt - stockUsed;

    if (netStockChange < 0) {
      const currentPartLocationStock = await this.findOne(partId, locationId);

      if (currentPartLocationStock.stock + netStockChange < 0) {
        throw new PreconditionFailedException(
          `This operation would result in negative stock. Current stock: ${currentPartLocationStock.stock}, netStockChange: ${netStockChange}`,
        );
      }
    }

    const updatedPartLocationStock = await this.partLocationStockModel.findOneAndUpdate(
      { partId, locationId },
      { $inc: { stock: netStockChange } },
      { new: true, upsert: true },
    );

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
   * Returns NotFoundException if partLocationStock is null, otherwise returns partLocationStock
   *
   * @param partLocationStockResult a retrieved partLocationStock
   * @param partId string of the part's objectId
   * @param locationId string of the location's objectId
   */
  validatePartLocationStockFound(
    partLocationStockResult: any,
    partId: string,
    locationId: string,
  ) {
    if (!partLocationStockResult) {
      throw new NotFoundException(
        `PartLocationStock with part id ${partId} and location id ${locationId} not found`,
      );
    } else {
      return partLocationStockResult;
    }
  }
}
