import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format, parse } from 'date-fns';
import { Model } from 'mongoose';
import { UpdateMaterialLogDto } from '../materials-logs/dto/update-material-log.dto';
import { UpdateMaterialStockDto } from './dto/update-material-stock.dto';
import { MaterialLogsService } from '../materials-logs/material-logs.service';
import { LocationsService } from '../../locations/locations.service';
import { MaterialsService } from './materials.service';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MaterialStockDocument,
  MaterialStock,
} from './schemas/material-stock.schema';

/**
 * Used by the MaterialsController, handles material location stock data storage and retrieval.
 */
@Injectable()
export class MaterialStockService {
  constructor(
    @InjectModel(MaterialStock.name)
    private materialStockModel: Model<MaterialStockDocument>,
    private readonly materialsService: MaterialsService,
    private readonly materialLogsService: MaterialLogsService,
    private readonly locationsService: LocationsService,
  ) {}

  /**
   * Retrieves stock info for all materials at a certain location
   *
   * @param locationId the id of the location
   */
  async findAll(locationId: string): Promise<MaterialStock[]> {
    return await this.materialStockModel
      .find({ locationId })
      .populate('materialId')
      .exec();
  }

  /**
   * Retrieves the stock info of a certain material at a certain location
   *
   * @param materialId the id of the material
   * @param locationId the id of the location
   */
  async findOne(
    materialId: string,
    locationId: string,
  ): Promise<MaterialStock> {
    let materialStock = await this.materialStockModel
      .findOne({ materialId, locationId })
      .populate('materialId')
      .exec();

    //if stock info is not found, check if material and location are valid
    //and create new entry
    if (!materialStock) {
      const material = await this.materialsService.findOne(materialId);
      const location = await this.locationsService.findOne(locationId);

      if (material && location) {
        materialStock = new this.materialStockModel({
          materialId,
          locationId,
          stock: 0,
        });
        await materialStock.save();
      }
    }

    return this.validateMaterialStockFound(
      materialStock,
      materialId,
      locationId,
    );
  }

  /**
   * Updates material stock by id using mongoose materialStockModel
   *
   * @param locationId string of the location's objectId
   * @param updateMaterialStockDto dto used to update material stock
   */
  async update(
    locationId: string,
    updateMaterialStockDto: UpdateMaterialStockDto[],
  ): Promise<MaterialStock> {
    const updatedStocks = [];
    for (let i = 0; i < updateMaterialStockDto.length; i++) {
      const { materialId, stockBought, stockUsed } = updateMaterialStockDto[i];
      const netStockChange = stockBought - stockUsed;
      if (netStockChange < 0) {
        const currentStock = await this.findOne(materialId, locationId);
        if (currentStock.stock + netStockChange < 0) {
          throw new BadRequestException(
            `This operation would result in negative stock. Current stock: ${currentStock.stock}, netStockChange: ${netStockChange}`,
          );
        }
      }

      const updatedStock = await this.materialStockModel
        .findOneAndUpdate(
          { materialId, locationId },
          { $inc: { stock: netStockChange } },
          { new: true, upsert: true },
        )
        .populate('materialId')
        .exec();

      if (updatedStock) {
        const updateMaterialLogDto: UpdateMaterialLogDto = {
          materialId,
          locationId,
          stock: updatedStock.stock,
          stockBought,
          stockUsed,
          date: parse(format(new Date(2021, 5, 1), 'd/M/y'), 'dd/MM/yyyy', new Date()),
        };

        await this.materialLogsService.update(updateMaterialLogDto);

        updatedStocks.push(updatedStock);
      }
    }

    return this.validateMaterialStockFound(
      updatedStocks,
      '"many IDs"',
      locationId,
    );
  }

  /**
   * Returns NotFoundException if materialStock is null, otherwise returns materialStock
   *
   * @param materialStockResult a retrieved materialStock
   * @param materialId string of the material's objectId
   * @param locationId string of the location's objectId
   */
  validateMaterialStockFound(
    materialStockResult: any,
    materialId: string,
    locationId: string,
  ) {
    if (!materialStockResult) {
      throw new NotFoundException(
        `MaterialStock with material id ${materialId} and location id ${locationId} not found`,
      );
    } else {
      return materialStockResult;
    }
  }
}
