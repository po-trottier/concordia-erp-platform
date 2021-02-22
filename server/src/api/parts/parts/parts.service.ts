import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { Model } from 'mongoose';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PartDocument, Part } from './schemas/part.schema';
import { PartQuantityUpdatedEvent } from './events/part-quantity-updated.event';

/**
 * Used by the PartsController, handles part data storage and retrieval.
 */
@Injectable()
export class PartsService {
  constructor(
    @InjectModel(Part.name) private partModel: Model<PartDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * Creates part using mongoose partModel
   *
   * @param createPartDto dto used to create parts
   */
  async create(createPartDto: CreatePartDto): Promise<Part> {
    const createdPart = new this.partModel(createPartDto);
    createdPart.save();

    const event: PartQuantityUpdatedEvent = {
      partId: createdPart.id,
      stock: createPartDto.stock || 0,
      date: format(new Date(), 'd/M/y'),
    };

    this.eventEmitter.emit('part.quantity.updated', event);

    return createdPart;
  }

  /**
   * Retrieves all parts using mongoose partModel
   */
  async findAll(): Promise<Part[]> {
    return this.partModel.find();
  }

  /**
   * Retrieves a part by id using mongoose partModel
   *
   * @param id string of the part's objectId
   */
  async findOne(id: string): Promise<Part> {
    const part = await this.partModel.findById(id);
    return this.validatePartFound(part, id);
  }

  /**
   * Updates part by id using mongoose partModel
   * If stock is part of the update, emits the part.quantity.updated event
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

    if (updatedPart && updatePartDto.stock) {
      const event: PartQuantityUpdatedEvent = {
        partId: id,
        stock: updatePartDto.stock,
        date: format(new Date(), 'd/M/y'),
      };

      this.eventEmitter.emit('part.quantity.updated', event);
    }

    return this.validatePartFound(updatedPart, id);
  }

  /**
   * Deletes part by id using mongoose partModel
   *
   * @param id string of the part's objectId
   */
  async remove(id: string): Promise<Part> {
    const deletedPart = await this.partModel.findByIdAndDelete(id);
    return this.validatePartFound(deletedPart, id);
  }

  /**
   * Returns NotFoundException if part is null, otherwise returns part
   *
   * @param partResult a retrieved part
   * @param id string of the part's objectId
   */
  validatePartFound(partResult: any, id: string) {
    if (!partResult) {
      throw new NotFoundException(`Part with id ${id} not found`);
    } else {
      return partResult;
    }
  }
}
