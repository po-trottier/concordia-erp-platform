import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
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
import { EventMap } from '../../../events/common';
import {UserToken} from "../../../shared/user-token.interface";
import {JwtService} from "@nestjs/jwt";

/**
 * Used by the MaterialsController, handles material data storage and retrieval.
 */
@Injectable()
export class MaterialsService {
  constructor(
    private jwtService: JwtService,
    private emitter: EventEmitter2,
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
   * @param auth
   */
  async create(createMaterialDto: CreateMaterialDto, auth: string): Promise<Material> {
    const createdMaterial = new this.materialModel(createMaterialDto);

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const material = await createdMaterial.save();
    this.emitter.emit(EventMap.MATERIAL_CREATED.id, {material, token});
    return material;
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
   * @param auth
   */
  async update(
    id: string,
    updateMaterialDto: UpdateMaterialDto,
    auth: string
  ): Promise<Material> {
    const updatedMaterial = await this.materialModel.findByIdAndUpdate(
      id,
      { $set: { ...updateMaterialDto } },
      { new: true },
    );

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const material = this.validateMaterialFound(updatedMaterial, id);
    this.emitter.emit(EventMap.MATERIAL_MODIFIED.id, {material, token});
    return material;
  }

  /**
   * Deletes material by id using mongoose materialModel
   *
   * @param id string of the material's objectId
   * @param auth
   */
  async remove(id: string, auth: string): Promise<Material> {
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

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const material = this.validateMaterialFound(deletedMaterial, id);
    this.emitter.emit(EventMap.MATERIAL_DELETED.id, {material, token});
    return material;
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
