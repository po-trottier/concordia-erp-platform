import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePartLogDto } from './dto/update-part-log.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PartLog, PartLogDocument } from './schemas/part-log.schema';

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
  async findAll(locationId: string): Promise<PartLog[]> {
    return await this.partLogModel
      .find({
        locationId,
      })
      .populate('partId')
      .exec();
  }

  /**
   * Retrieves a partLog by composite key using mongoose partLogModel
   *
   * @param partId the id of the corresponding part
   * @param locationId the id of the location
   */
  async findOne(partId: string, locationId: string): Promise<PartLog[]> {
    return await this.partLogModel
      .find({
        partId,
        locationId,
      })
      .populate('partId')
      .exec();
  }

  /**
   * Updates partLog by id using mongoose partLogModel
   *
   * @param updatePartLogDto dto used to update part logs
   */
  async update(updatePartLogDto: UpdatePartLogDto): Promise<PartLog> {
    const {
      partId,
      locationId,
      date,
      stock,
      stockBuilt,
      stockUsed,
    } = updatePartLogDto;

    const updatedPartLog = await this.partLogModel.findOneAndUpdate(
      { partId, locationId, date },
      { $set: { stock }, $inc: { stockBuilt, stockUsed } },
      { new: true, upsert: true },
    );

    return this.validatePartLogFound(
      updatedPartLog,
      partId,
      locationId,
      date.toString(),
    );
  }

  /**
   * Returns NotFoundException if partLog is null, otherwise returns partLog
   *
   * @param partLogResult a retrieved part
   * @param partId the id of the corresponding part
   * @param locationId the id of the location
   * @param date the date in history
   */
  validatePartLogFound(
    partLogResult: any,
    partId: string,
    locationId: string,
    date: string,
  ) {
    if (!partLogResult) {
      throw new NotFoundException(
        `PartLog entry with partId ${partId} and locationId ${locationId} on ${date} not found`,
      );
    } else {
      return partLogResult;
    }
  }
}
