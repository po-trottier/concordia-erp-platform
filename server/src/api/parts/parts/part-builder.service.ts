import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { UpdateMaterialStockDto } from '../../materials/materials/dto/update-material-stock.dto';
import { UpdatePartStockDto } from "./dto/update-part-stock.dto";
import { BuildPartDto } from './dto/build-part.dto';
import { PartsService } from './parts.service';
import { MaterialLocationStockService } from '../../materials/materials/material-location-stock.service';
import {PartLocationStockService} from './part-location-stock.service';

/**
 * Used by the PartsController, handles part data storage and retrieval.
 */
@Injectable()
export class PartBuilderService {
  constructor(
    private readonly partsService: PartsService,
    private readonly materialLocationStockService: MaterialLocationStockService,
    private readonly partLocationStockService: PartLocationStockService,
  ) {}

  /**
   * builds a part if enough materials are present
   *
   * @param partId of the part
   * @param locationId of the location
   * @param buildPartDto
   */
  async build(
    partId: string,
    locationId: string,
    buildPartDto: BuildPartDto,
  ): Promise<Object> {
    const { stockBuilt } = buildPartDto;

    // checking if we can do the operation
    const part = await this.partsService.findOne(partId);
    for (let i = 0; i < part.materials.length; i++) {
      const material = part.materials[i];
      const totalMaterialsCount = material.quantity * stockBuilt;
      const materialLocationStock = await this.materialLocationStockService.findOne(
        material.materialId,
        locationId,
      );
      if (materialLocationStock.stock < totalMaterialsCount) {
        throw new BadRequestException({error: 'stock of materials is not sufficient'});
      }
    }

    // update part stock
    const updatePartStockDto: UpdatePartStockDto = {
      stockBuilt: stockBuilt,
      stockUsed: 0
    };

    const updatedPartLocationStock = await this.partLocationStockService.update(
      partId,
      locationId,
      updatePartStockDto,
    );

    // update materials stock
    const updatedMaterialLocationStocks = [];
    const updateMaterialStockDto: UpdateMaterialStockDto = {
      stockBought: 0,
      stockUsed: null
    };

    for (let i = 0; i < part.materials.length; i++) {
      const material = part.materials[i];
      updateMaterialStockDto.stockUsed = material.quantity * stockBuilt;
      const updatedMaterialLocationStock = await this.materialLocationStockService.update(
        material.materialId,
        locationId,
        updateMaterialStockDto,
      );
      updatedMaterialLocationStocks.push(updatedMaterialLocationStock);
    }
    return { updatedPartLocationStock, updatedMaterialLocationStocks };
  }
}