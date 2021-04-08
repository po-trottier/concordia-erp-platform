import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addPredictions } from '../../../shared/predictions';
import { UpdateMaterialLogDto } from './dto/update-material-log.dto';
import {
  MaterialLog,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MaterialLogDocument,
} from './schemas/material-log.schema';

/**
 * Handles materialLog data storage and retrieval.
 */
@Injectable()
export class MaterialLogsService {
  constructor(
    @InjectModel(MaterialLog.name)
    private materialLogModel: Model<MaterialLogDocument>,
  ) {}

  /**
   * Retrieves all materialLog entries using mongoose materialLogModel
   */
  async findAll(locationId: string): Promise<MaterialLog[]> {
    const materials = await this.materialLogModel
      .find({ locationId })
      .sort('materialId')
      .sort('date')
      .populate('materialId')
      .exec();
    return addPredictions(materials, 'materialId');
  }

  /**
   * Retrieves a materialLog by composite key using mongoose materialLogModel
   *
   * @param materialId the id of the corresponding material
   * @param locationId the id of the location
   */
  async findOne(
    materialId: string,
    locationId: string,
  ): Promise<MaterialLog[]> {
    return await this.materialLogModel
      .find({ materialId, locationId })
      .populate('materialId')
      .exec();
  }

  /**
   * Updates materialLog by id using mongoose materialLogModel
   *
   * @param updateMaterialLogDto dto used to update material logs
   */
  async update(
    updateMaterialLogDto: UpdateMaterialLogDto,
  ): Promise<MaterialLog> {
    const {
      materialId,
      locationId,
      date,
      stock,
      stockBought,
      stockUsed,
    } = updateMaterialLogDto;

    const updatedMaterialLog = await this.materialLogModel
      .findOneAndUpdate(
        { materialId, locationId, date },
        { $set: { stock }, $inc: { stockBought, stockUsed } },
        { new: true, upsert: true },
      )
      .populate('materialId')
      .exec();

    return this.validateMaterialLogFound(
      updatedMaterialLog,
      materialId,
      locationId,
      date.toString(),
    );
  }

  /**
   * Returns NotFoundException if materialLog is null, otherwise returns materialLog
   *
   * @param materialLogResult a retrieved material
   * @param materialId the id of the corresponding material
   * @param locationId the id the location
   * @param date the date in history
   */
  validateMaterialLogFound(
    materialLogResult: any,
    materialId: string,
    locationId: string,
    date: string,
  ) {
    if (!materialLogResult) {
      throw new NotFoundException(
        `MaterialLog entry with materialId ${materialId} and locationId ${locationId} on ${date} not found`,
      );
    } else {
      return materialLogResult;
    }
  }
}
