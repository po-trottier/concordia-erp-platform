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
   * Retrieves all partLog entries using mongoose partModel
   */
  async findAll(): Promise<PartLog[]> {
    return this.partLogModel.find();
  }

  async update(updatePartLogDto: UpdatePartLogDto): Promise<PartLog> {
    const { partId, date, stock } = updatePartLogDto;

    const updatedPartLog = await this.partLogModel.findOneAndUpdate(
      { partId, date },
      { stock },
      { new: true, upsert: true },
    );

    return this.validatePartLogFound(updatedPartLog, partId, date);
  }

  /**
   * Returns NotFoundException if part is null, otherwise returns part
   *
   * @param partLogResult a retrieved part
   * @param partId the id of the corresponding part
   * @param date the date in history
   */
  validatePartLogFound(partLogResult: any, partId: string, date: string) {
    if (!partLogResult) {
      throw new NotFoundException(
        `PartLog entry with partId ${partId} on ${date} not found`,
      );
    } else {
      return partLogResult;
    }
  }
}
