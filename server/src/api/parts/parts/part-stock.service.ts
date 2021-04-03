import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
  PartStockDocument,
  PartStock,
} from './schemas/part-stock.schema';

/**
 * Used by the PartsController, handles part location stock data storage and retrieval.
 */
@Injectable()
export class PartStockService {
  constructor(
    @InjectModel(PartStock.name)
    private partStockModel: Model<PartStockDocument>,
    private readonly partsService: PartsService,
    private readonly partLogsService: PartLogsService,
    private readonly locationsService: LocationsService,
  ) {}

  /**
   * Retrieves stock info for all parts at a certain location
   *
   * @param locationId the id of the location
   */
  async findAll(locationId: string): Promise<PartStock[]> {
    return this.partStockModel.find({ locationId });
  }

  /**
   * Retrieves the stock info of a certain part at a certain location
   *
   * @param partId the id of the part
   * @param locationId the id of the location
   */
  async findOne(partId: string, locationId: string): Promise<PartStock> {
    let partStock = await this.partStockModel.findOne({
      partId,
      locationId,
    });

    //if stock info is not found, check if part and location are valid
    //and create new entry
    if (!partStock) {
      const part = await this.partsService.findOne(partId);
      const location = await this.locationsService.findOne(locationId);

      if (part && location) {
        partStock = new this.partStockModel({
          partId,
          locationId,
          stock: 0,
        });
        partStock.save();
      }
    }

    return this.validatePartStockFound(partStock, partId, locationId);
  }

  /**
   * Updates part stock by id using mongoose partStockModel
   *
   * @param locationId string of the location's objectId
   * @param updatePartStockDto dto used to update part stock
   */
  async update(
    locationId: string,
    updatePartStockDto: UpdatePartStockDto[],
  ): Promise<PartStock[]> {
    const updatedStocks = [];

    for (let i = 0; i < updatePartStockDto.length; i++) {
      const { stockBuilt, stockUsed, partId } = updatePartStockDto[i];

      const netStockChange = stockBuilt - stockUsed;

      if (netStockChange < 0) {
        const currentStock = await this.findOne(partId, locationId);

        if (currentStock.stock + netStockChange < 0) {
          throw new BadRequestException(
            `This operation would result in negative stock. Current stock: ${currentStock.stock}, netStockChange: ${netStockChange}`,
          );
        }
      }

      const updatedStock = await this.partStockModel
        .findOneAndUpdate(
          { partId, locationId },
          { $inc: { stock: netStockChange } },
          { new: true, upsert: true },
        )
        .populate('partId')
        .exec();

      if (updatedStock) {
        const updatePartLogDto: UpdatePartLogDto = {
          partId,
          locationId,
          stock: updatedStock.stock,
          stockBuilt,
          stockUsed,
          date: parse(format(new Date(), 'd/M/y'), 'dd/MM/yyyy', new Date()),
        };

        await this.partLogsService.update(updatePartLogDto);

        updatedStocks.push(updatedStock);
      }
    }

    return this.validatePartStockFound(updatedStocks, 'many', locationId);
  }

  /**
   * Returns NotFoundException if partStock is null, otherwise returns partStock
   *
   * @param partStockResult a retrieved partStock
   * @param partId string of the part's objectId
   * @param locationId string of the location's objectId
   */
  validatePartStockFound(
    partStockResult: any,
    partId: string,
    locationId: string,
  ) {
    if (!partStockResult) {
      throw new NotFoundException(
        `PartStock with part id ${partId} and location id ${locationId} not found`,
      );
    } else {
      return partStockResult;
    }
  }
}
