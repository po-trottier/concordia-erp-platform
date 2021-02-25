import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateMaterialLogDto } from './dto/update-material-log.dto';
import { MaterialLogDocument, MaterialLog } from './schemas/material-log.schema';

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
  async findAll(): Promise<MaterialLog[]> {
    return this.materialLogModel.find();
  }

  /**
   * Retrieves a materialLog by composite key using mongoose materialLogModel
   *
   * @param materialId the id of the corresponding material
   * @param date the date in history
   */
  async findOne(materialId: string, date: Date): Promise<MaterialLog> {
    const materialLog = await this.materialLogModel.findOne({ materialId, date });
    return this.validateMaterialLogFound(materialLog, materialId, date);
  }

  /**
   * Updates materialLog by id using mongoose materialLogModel
   *
   * @param updateMaterialLogDto dto used to update material logs
   */
  async update(updateMaterialLogDto: UpdateMaterialLogDto): Promise<MaterialLog> {
    const { materialId, date, stock, stockBought, stockUsed } = updateMaterialLogDto;

    const updatedMaterialLog = await this.materialLogModel.findOneAndUpdate(
      { materialId, date },
      { $set: { stock }, $inc: { stockBought, stockUsed } },

      { new: true, upsert: true },
    );

    return this.validateMaterialLogFound(updatedMaterialLog, materialId, date);
  }

  /**
   * Returns NotFoundException if materialLog is null, otherwise returns materialLog
   *
   * @param materialLogResult a retrieved material
   * @param materialId the id of the corresponding material
   * @param date the date in history
   */
  validateMaterialLogFound(materialLogResult: any, materialId: string, date: Date) {
    if (!materialLogResult) {
      throw new NotFoundException(
        `MaterialLog entry with materialId ${materialId} on ${date.toString()} not found`,
      );
    } else {
      return materialLogResult;
    }
  }
}
