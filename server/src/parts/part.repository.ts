import { EntityRepository, MongoRepository } from 'typeorm';
import { Part } from './entities/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { ObjectId } from 'mongodb';

/**
 * Part repository, contains database logic
 */
@EntityRepository(Part)
export class PartRepository extends MongoRepository<Part> {
  /**
   * Creates new Part in the database using the save() repository method
   *
   * @param createPartDto dto used to create parts
   */
  async createPart(createPartDto: CreatePartDto): Promise<Part> {
    const part = new Part();

    for (const [key, value] of Object.entries(createPartDto)) {
      console.log(`${key}: ${value}`);
      part[key] = value;
    }

    try {
      await part.save();
    } catch (error) {
      console.log('error', error.stack);
    }

    return part;
  }

  /**
   * Updates a part in the database using the findOneAndUpdate() repository method
   *
   * @param id string of the part's objectId
   * @param updatePartDto dto used to update parts
   */
  async updatePart(id: string, updatePartDto: UpdatePartDto): Promise<Part> {
    const { value: updatedPart } = await this.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updatePartDto } },
      { returnOriginal: false },
    );

    return updatedPart;
  }

  /**
   * Deletes a part in the database using the findOneAndDelete() repository method
   *
   * @param id string of the part's objectId
   */
  async deletePart(id: string): Promise<Part> {
    const { value: deletedPart } = await this.findOneAndDelete({
      _id: new ObjectId(id),
    });

    return deletedPart;
  }
}
