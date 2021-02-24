import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePartLogDto } from './dto/update-part-log.dto';
import { PartLogDocument, PartLog } from './schemas/part-log.schema';

/**
 * Handles partLog data storage and retrieval.
 */
@Injectable()
export class PartLogsService {
  constructor(
    @InjectModel(PartLog.name)
    private partLogModel: Model<PartLogDocument>,
  ) {}

  /**
   * Retrieves all partLog entries using mongoose partLogModel
   */
  async findAll(): Promise<PartLog[]> {
    return this.partLogModel.find();
  }

  /**
   * Retrieves a partLog by composite key using mongoose partLogModel
   *
   * @param partId the id of the corresponding part
   * @param date the date in history
   */
  async findOne(partId: string, date: Date): Promise<PartLog> {
    const partLog = await this.partLogModel.findOne({ partId, date });
    return this.validatePartLogFound(partLog, partId, date);
  }

  /**
   * Updates partLog by id using mongoose partLogModel
   *
   * @param updatePartLogDto dto used to update part logs
   */
  async update(updatePartLogDto: UpdatePartLogDto): Promise<PartLog> {
    const { partId, date, stock, stockBuilt, stockUsed } = updatePartLogDto;

    const updatedPartLog = await this.partLogModel.findOneAndUpdate(
      { partId, date },
      { stock, stockBuilt, stockUsed },
      { new: true, upsert: true },
    );

    return this.validatePartLogFound(updatedPartLog, partId, date);
  }

  /**
   * Returns NotFoundException if partLog is null, otherwise returns partLog
   *
   * @param partLogResult a retrieved part
   * @param partId the id of the corresponding part
   * @param date the date in history
   */
  validatePartLogFound(partLogResult: any, partId: string, date: Date) {
    if (!partLogResult) {
      throw new NotFoundException(
        `PartLog entry with partId ${partId} on ${date.toString()} not found`,
      );
    } else {
      return partLogResult;
    }
  }
}
