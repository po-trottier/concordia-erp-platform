import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PartDocument, Part } from './schemas/part.schema';

/**
 * Used by the PartsController, handles part data storage and retrieval.
 */
@Injectable()
export class PartsService {
  constructor(@InjectModel(Part.name) private partModel: Model<PartDocument>) {}

  /**
   * Creates part using mongoose partModel
   *
   * @param createPartDto dto used to create parts
   */
  async create(createPartDto: CreatePartDto): Promise<Part> {
    const createdPart = new this.partModel(createPartDto);
    return createdPart.save();
  }

  /**
   * Retrieves all parts using mongoose partModel
   */
  async findAll(): Promise<Part[]> {
    return await this.partModel.find().exec();
  }

  /**
   * Retrieves a part by id using mongoose partModel
   *
   * @param id string of the part's objectId
   */
  async findOne(id: string): Promise<Part> {
    const part = await this.partModel.findById(id);

    return this.checkPartFound(part, id);
  }

  /**
   * Updates part by id using mongoose partModel
   *
   * @param id string of the part's objectId
   * @param updatePartDto dto used to update parts
   */
  async update(id: string, updatePartDto: UpdatePartDto): Promise<Part> {
    const updatedPart = await this.partModel.findByIdAndUpdate(
      id,
      { $set: { ...updatePartDto } },
      { new: true },
    );

    return this.checkPartFound(updatedPart, id);
  }

  /**
   * Deletes part by id using mongoose partModel
   *
   * @param id string of the part's objectId
   */
  async remove(id: string): Promise<PartDocument> {
    const deletedPart = await this.partModel.findByIdAndDelete(id);

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
