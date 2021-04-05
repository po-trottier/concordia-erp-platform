import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Material, MaterialDocument } from './schemas/material.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Part, PartDocument } from '../../parts/parts/schemas/part.schema';
import {
  MaterialStock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MaterialStockDocument,
} from './schemas/material-stock.schema';
import {
  MaterialLog,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MaterialLogDocument,
} from '../materials-logs/schemas/material-log.schema';

/**
 * Used by the MaterialsController, handles material data storage and retrieval.
 */
@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Part.name)
    private partModel: Model<PartDocument>,
    @InjectModel(Material.name)
    private materialModel: Model<MaterialDocument>,
    @InjectModel(MaterialLog.name)
    private materialLogModel: Model<MaterialLogDocument>,
    @InjectModel(MaterialStock.name)
    private materialStockModel: Model<MaterialStockDocument>,
  ) {}

  /**
   * Creates material using mongoose materialModel
   *
   * @param createMaterialDto dto used to create materials
   */
  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const createdMaterial = new this.materialModel(createMaterialDto);
    return await createdMaterial.save();
  }

  /**
   * Retrieves all materials using mongoose materialModel
   */
  async findAll(): Promise<Material[]> {
    return this.materialModel.find();
  }

  /**
   * Retrieves a material by id using mongoose materialModel
   *
   * @param id string of the material's objectId
   */
  async findOne(id: string): Promise<Material> {
    const material = await this.materialModel.findById(id);
    return this.validateMaterialFound(material, id);
  }

  /**
   * Updates material by id using mongoose materialModel
   *
   * @param id string of the material's objectId
   * @param updateMaterialDto dto used to update materials
   */
  async update(
    id: string,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    const updatedMaterial = await this.materialModel.findByIdAndUpdate(
      id,
      { $set: { ...updateMaterialDto } },
      { new: true },
    );
    return this.validateMaterialFound(updatedMaterial, id);
  }

  /**
   * Deletes material by id using mongoose materialModel
   *
   * @param id string of the material's objectId
   */
  async remove(id: string): Promise<Material> {
    // Make sure no parts depend on the material
    const dependantParts = await this.partModel.find({
      'materials.materialId': id,
    });
    if (dependantParts.length > 0) {
      throw new ForbiddenException(
        'One or more parts (' +
          dependantParts.map((p: Part) => p.name).join(', ') +
          ') use the material you are trying to delete.',
      );
    }
    // Remove all stock entries for that material
    const stocks = await this.materialStockModel.find({ materialId: id });
    for (const stock of stocks) {
      await stock.delete();
    }
    // Remove all logs for that material
    const logs = await this.materialLogModel.find({ materialId: id });
    for (const log of logs) {
      await log.delete();
    }
    // Remove the material
    const deletedMaterial = await this.materialModel.findByIdAndDelete(id);
    return this.validateMaterialFound(deletedMaterial, id);
  }

  /**
   * Returns NotFoundException if material is null, otherwise returns material
   *
   * @param materialResult a retrieved material
   * @param id string of the material's objectId
   */
  validateMaterialFound(materialResult: any, id: string) {
    if (!materialResult) {
      throw new NotFoundException(`Material with id ${id} not found`);
    } else {
      return materialResult;
    }
  }
}