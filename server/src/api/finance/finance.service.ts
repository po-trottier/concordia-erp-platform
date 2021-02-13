import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFinanceEntryDto } from './dto/create-fin-entry.dto';
import { UpdateFinanceEntryDto } from './dto/update-fin-entry.dto';
import { FinentryDocument, Finentry } from './schemas/finance.schema';

/**
 * Used by the FinentrysController, handles finentry data storage and retrieval.
 */
@Injectable()
export class FinanceService {
  constructor(@InjectModel(Finentry.name) private finentryModel: Model<FinentryDocument>) {}

  /**
   * Creates finentry using mongoose finentryModel
   *
   * @param createFinanceEntryDto dto used to create finentrys
   */
  async create(createFinanceEntryDto: CreateFinanceEntryDto): Promise<Finentry> {
    const createdFinentry = new this.finentryModel(createFinanceEntryDto);
    return createdFinentry.save();
  }

  /**
   * Retrieves all finentrys using mongoose finentryModel
   */
  async findAll(): Promise<Finentry[]> {
    return await this.finentryModel.find().exec();
  }

  /**
   * Retrieves a finentry by id using mongoose finentryModel
   *
   * @param id string of the finentry's objectId
   */
  async findOne(id: string): Promise<Finentry> {
    const finentry = await this.finentryModel.findById(id);

    return this.checkFinentryFound(finentry, id);
  }

  /**
   * Updates finentry by id using mongoose finentryModel
   *
   * @param id string of the finentry's objectId
   * @param updateFinanceEntryDto dto used to update finentrys
   */
  async update(id: string, updateFinanceEntryDto: UpdateFinanceEntryDto): Promise<Finentry> {
    const updatedFinentry = await this.finentryModel.findByIdAndUpdate(
      id,
      { $set: { ...updateFinanceEntryDto } },
      { new: true },
    );

    return this.checkFinentryFound(updatedFinentry, id);
  }

  /**
   * Deletes finentry by id using mongoose finentryModel
   *
   * @param id string of the finentry's objectId
   */
  async remove(id: string): Promise<FinentryDocument> {
    const deletedFinentry = await this.finentryModel.findByIdAndDelete(id);

    return this.checkFinentryFound(deletedFinentry, id);
  }

  /**
   * Returns NotFoundException if finentry is null, otherwise returns finentry
   *
   * @param finentryResult a retrieved finentry
   * @param id string of the finentry's objectId
   */
  checkFinentryFound(finentryResult: any, id: string) {
    if (!finentryResult) {
      throw new NotFoundException(`Finentry with id ${id} not found`);
    } else {
      return finentryResult;
    }
  }
}
