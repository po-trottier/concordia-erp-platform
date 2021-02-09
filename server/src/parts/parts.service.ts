import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PartRepository } from './part.repository';
import { Part } from './entities/part.entity';

/**
 * Used by the PartsController, handles part data storage and retrieval.
 */
@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(PartRepository)
    private partRepository: PartRepository,
  ) {}

  /**
   * Creates part using PartRepository
   *
   * @param createPartDto dto used to create parts
   */
  create(createPartDto: CreatePartDto) {
    return this.partRepository.createPart(createPartDto);
  }

  /**
   * Retrieves all parts using PartRepository
   */
  async findAll(): Promise<Part[]> {
    return await this.partRepository.find();
  }

  /**
   * Retrieves a part by id using PartRepository
   *
   * @param id string of the part's objectId
   */
  async findOne(id: string): Promise<Part> {
    const part = await this.partRepository.findOne(id);

    return this.checkPartFound(part, id);
  }

  /**
   * Updates part by id using PartRepository
   *
   * @param id string of the part's objectId
   * @param updatePartDto dto used to update parts
   */
  async update(id: string, updatePartDto: UpdatePartDto): Promise<Part> {
    const updatedPart = await this.partRepository.updatePart(id, updatePartDto);

    return this.checkPartFound(updatedPart, id);
  }

  /**
   * Deletes part by id using PartRepository
   *
   * @param id string of the part's objectId
   */
  async remove(id: string): Promise<Part> {
    const deletedPart = await this.partRepository.deletePart(id);

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
