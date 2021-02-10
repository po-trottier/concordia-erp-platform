import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PartDocument, Part } from './schemas/part.schema';
import { ObjectId } from 'mongodb';

/**
 * Used by the PartsController, handles part data storage and retrieval.
 */
@Injectable()
export class PartsService {
  constructor(@InjectModel(Part.name) private partModel: Model<PartDocument>) {}

  /**
   * Creates part using PartRepository
   *
   * @param createPartDto dto used to create parts
   */
  create(createPartDto: CreatePartDto): Promise<PartDocument> {
    const createdPart = new this.partModel(createPartDto);
    return createdPart.save();
  }

  /**
   * Retrieves all parts using PartRepository
   */
  async findAll(): Promise<PartDocument[]> {
    return await this.partModel.find();
  }

  /**
   * Retrieves a part by id using PartRepository
   *
   * @param id string of the part's objectId
   */
  async findOne(id: string): Promise<PartDocument> {
    const part = await this.partModel.findOne({ _id: new ObjectId(id) });

    return this.checkPartFound(part, id);
  }

  /**
   * Updates part by id using PartRepository
   *
   * @param id string of the part's objectId
   * @param updatePartDto dto used to update parts
   */
  async update(
    id: string,
    updatePartDto: UpdatePartDto,
  ): Promise<PartDocument> {
    const updatedPart = await this.partModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updatePartDto } },
      { new: true },
    );

    return this.checkPartFound(updatedPart, id);
  }

  /**
   * Deletes part by id using PartRepository
   *
   * @param id string of the part's objectId
   */
  async remove(id: string): Promise<PartDocument> {
    const deletedPart = await this.partModel.findOneAndDelete({
      _id: new ObjectId(id),
    });

    return this.checkPartFound(deletedPart, id);
  }

  /**
   * Returns NotFoundException if part is null, otherwise returns part
   *
   * @param partResult a retrieved part
   * @param id string of the part's objectId
   */
  checkPartFound(partResult: any, id: string) {
    if (!partResult) {
      throw new NotFoundException(`Part with id ${id} not found`);
    } else {
      return partResult;
    }
  }
}
