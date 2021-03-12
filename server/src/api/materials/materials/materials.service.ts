import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Material, MaterialDocument } from './schemas/material.schema';

/**
 * Used by the MaterialsController, handles material data storage and retrieval.
 */
@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<MaterialDocument>,
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
