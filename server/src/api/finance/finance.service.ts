import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFinanceEntryDto } from './dto/create-finance-entry.dto';
import { UpdateFinanceEntryDto } from './dto/update-finance-entry.dto';
import { FinanceEntry, FinanceEntryDocument } from './schemas/finance.schema';

/**
 * Used by the FinanceEntrysController, handles financeEntry data storage and retrieval.
 */
@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(FinanceEntry.name)
    private financeEntryModel: Model<FinanceEntryDocument>,
  ) {}

  /**
   * Creates financeEntry using mongoose financeEntryModel
   *
   * @param createFinanceEntryDto dto used to create financeEntrys
   */
  async create(
    createFinanceEntryDto: CreateFinanceEntryDto,
  ): Promise<FinanceEntry> {
    const createdFinanceEntry = new this.financeEntryModel(
      createFinanceEntryDto,
    );
    return createdFinanceEntry.save();
  }

  /**
   * Retrieves all financeEntrys using mongoose financeEntryModel
   */
  async findAll(): Promise<FinanceEntry[]> {
    return await this.financeEntryModel.find().exec();
  }

  /**
   * Retrieves a financeEntry by id using mongoose financeEntryModel
   *
   * @param id string of the financeEntry's objectId
   */
  async findOne(id: string): Promise<FinanceEntry> {
    const financeEntry = await this.financeEntryModel.findById(id);

    return this.checkFinanceEntryFound(financeEntry, id);
  }

  /**
   * Updates financeEntry by id using mongoose financeEntryModel
   *
   * @param id string of the financeEntry's objectId
   * @param updateFinanceEntryDto dto used to update financeEntrys
   */
  async update(
    id: string,
    updateFinanceEntryDto: UpdateFinanceEntryDto,
  ): Promise<FinanceEntry> {
    const updatedFinanceEntry = await this.financeEntryModel.findByIdAndUpdate(
      id,
      { $set: { ...updateFinanceEntryDto } },
      { new: true },
    );

    return this.checkFinanceEntryFound(updatedFinanceEntry, id);
  }

  /**
   * Deletes financeEntry by id using mongoose financeEntryModel
   *
   * @param id string of the financeEntry's objectId
   */
  async remove(id: string): Promise<FinanceEntry> {
    const deletedFinanceEntry = await this.financeEntryModel.findByIdAndDelete(
      id,
    );

    return this.checkFinanceEntryFound(deletedFinanceEntry, id);
  }

  /**
   * Retrieves all receivable financeEntrys using mongoose financeEntryModel
   */
  async findAllReceivables(): Promise<FinanceEntry[]> {
    return await this.financeEntryModel.find({ amount: { $gt: 0 } });
  }

  /**
   * Retrieves all payable financeEntrys using mongoose financeEntryModel
   */
  async findAllPayables(): Promise<FinanceEntry[]> {
    return await this.financeEntryModel.find({ amount: { $lt: 0 } });
  }

  /**
   * Retrieves all active receivable financeEntrys using mongoose financeEntryModel
   */
  async findActiveReceivables(): Promise<FinanceEntry[]> {
    return await this.financeEntryModel.find({
      $expr: {
        $and: [
          { $gt: ['$amount', 0] },
          { $gt: [{ $abs: '$amount' }, { $abs: '$paid' }] },
        ],
      },
    });
  }

  /**
   * Retrieves all active payable financeEntrys using mongoose financeEntryModel
   */
  async findActivePayables(): Promise<FinanceEntry[]> {
    return await this.financeEntryModel.find({
      $expr: {
        $and: [
          { $lt: ['$amount', 0] },
          { $gt: [{ $abs: '$amount' }, { $abs: '$paid' }] },
        ],
      },
    });
  }

  /**
   * Returns NotFoundException if financeEntry is null, otherwise returns financeEntry
   *
   * @param financeEntryResult a retrieved financeEntry
   * @param id string of the financeEntry's objectId
   */
  checkFinanceEntryFound(financeEntryResult: any, id: string) {
    if (!financeEntryResult) {
      throw new NotFoundException(`FinanceEntry with id ${id} not found`);
    } else {
      return financeEntryResult;
    }
  }
}
