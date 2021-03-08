import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
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
  MaterialLocationStockDocument,
  MaterialLocationStock,
} from './schemas/material-location-stock.schema';

/**
 * Used by the MaterialsController, handles material location stock data storage and retrieval.
 */
@Injectable()
export class MaterialLocationStockService {
  constructor(
    @InjectModel(MaterialLocationStock.name)
    private materialLocationStockModel: Model<MaterialLocationStockDocument>,
    private readonly materialsService: MaterialsService,
    private readonly materialLogsService: MaterialLogsService,
    private readonly locationsService: LocationsService,
  ) {}

  /**
   * Retrieves stock info for all materials at a certain location
   *
   * @param locationId the id of the location
   */
  async findAll(locationId: string): Promise<MaterialLocationStock[]> {
    return this.materialLocationStockModel.find({ locationId });
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
  ): Promise<MaterialLocationStock> {
    let materialLocationStock = await this.materialLocationStockModel.findOne({
      materialId,
      locationId,
    });

    //if stock info is not found, check if material and location are valid
    //and create new entry
    if (!materialLocationStock) {
      const material = await this.materialsService.findOne(materialId);
      const location = await this.locationsService.findOne(locationId);

      if (material && location) {
        materialLocationStock = new this.materialLocationStockModel({
          materialId,
          locationId,
          stock: 0,
        });
        materialLocationStock.save();
      }
    }

    return this.validateMaterialLocationStockFound(
      materialLocationStock,
      materialId,
      locationId,
    );
  }

  /**
   * Updates material stock by id using mongoose materialLocationStockModel
   *
   * @param materialId string of the material's objectId
   * @param locationId string of the location's objectId
   * @param updateMaterialStockDto dto used to update material stock
   */
  async update(
    materialId: string,
    locationId: string,
    updateMaterialStockDto: UpdateMaterialStockDto,
  ): Promise<MaterialLocationStock> {
    const { stockBought, stockUsed } = updateMaterialStockDto;

    const netStockChange = stockBought - stockUsed;

    if (netStockChange < 0) {
      const currentMaterialLocationStock = await this.findOne(
        materialId,
        locationId,
      );

      if (currentMaterialLocationStock.stock + netStockChange < 0) {
        throw new PreconditionFailedException(
          `This operation would result in negative stock. Current stock: ${currentMaterialLocationStock.stock}, netStockChange: ${netStockChange}`,
        );
      }
    }

    const updatedMaterialLocationStock = await this.materialLocationStockModel.findOneAndUpdate(
      { materialId, locationId },
      { $inc: { stock: netStockChange } },
      { new: true, upsert: true },
    );

    if (updatedMaterialLocationStock) {
      const updateMaterialLogDto: UpdateMaterialLogDto = {
        materialId,
        locationId,
        stock: updatedMaterialLocationStock.stock,
        stockBought,
        stockUsed,
        date: parse(format(new Date(), 'd/M/y'), 'dd/MM/yyyy', new Date()),
      };

      await this.materialLogsService.update(updateMaterialLogDto);
    }

    return this.validateMaterialLocationStockFound(
      updatedMaterialLocationStock,
      materialId,
      locationId,
    );
  }

  /**
   * Returns NotFoundException if materialLocationStock is null, otherwise returns materialLocationStock
   *
   * @param materialLocationStockResult a retrieved materialLocationStock
   * @param materialId string of the material's objectId
   * @param locationId string of the location's objectId
   */
  validateMaterialLocationStockFound(
    materialLocationStockResult: any,
    materialId: string,
    locationId: string,
  ) {
    if (!materialLocationStockResult) {
      throw new NotFoundException(
        `MaterialLocationStock with material id ${materialId} and location id ${locationId} not found`,
      );
    } else {
      return materialLocationStockResult;
    }
  }
}
