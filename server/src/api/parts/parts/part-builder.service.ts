import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { UpdateMaterialStockDto } from '../../materials/materials/dto/update-material-stock.dto';
import { UpdatePartStockDto } from './dto/update-part-stock.dto';
import { BuildPartDto } from './dto/build-part.dto';
import { PartsService } from './parts.service';
import { MaterialLocationStockService } from '../../materials/materials/material-location-stock.service';
import { PartLocationStockService } from './part-location-stock.service';
import { Part } from './schemas/part.schema';
import { PartLocationStock } from './schemas/part-location-stock.schema';

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
   * @param locationId of the location
   * @param buildPartOrders
   */
  async build(
    locationId: string,
    buildPartOrders: BuildPartDto[],
  ): Promise<PartLocationStock[]> {
    const validatedBuildOrders: {
      stockBuilt: number;
      partId: string;
      part: Part;
    }[] = [];
    // checking every build order to see if there are sufficient materials in the db
    // at the same time populate validatedBuildOrders (add part to each object)
    for (const buildOrder of buildPartOrders) {
      if (!buildOrder.stockBuilt) {
        continue;
      }
      const { stockBuilt, partId } = buildOrder;
      const part = await this.partsService.findOne(partId);
      for (const material of part.materials) {
        const totalMaterialsCount = material.quantity * stockBuilt;
        const materialLocationStock = await this.materialLocationStockService.findOne(
          material.materialId,
          locationId,
        );
        if (materialLocationStock.stock < totalMaterialsCount) {
          throw new BadRequestException({
            error: 'stock of materials is not sufficient',
          });
        }
      }
      validatedBuildOrders.push({ ...buildOrder, part });
    }

    // completing every build order
    let buildResults = [];
    for (const buildOrder of validatedBuildOrders) {
      const { stockBuilt, partId, part } = buildOrder;
      // update part stock
      const updatePartStockDto: UpdatePartStockDto = {
        partId,
        stockBuilt,
        stockUsed: 0,
      };

      const updatedStock = await this.partLocationStockService.update(
        locationId,
        [updatePartStockDto],
      );

      // update parts stock

      const materialUpdates = [];
      for (const material of part.materials) {
        const updateMaterialStockDto: UpdateMaterialStockDto = {
          materialId: material.materialId,
          stockBought: 0,
          stockUsed: material.quantity * stockBuilt,
        };
        materialUpdates.push(updateMaterialStockDto);
      }

      await this.materialLocationStockService.update(
        locationId,
        materialUpdates,
      );

      buildResults = buildResults.concat(updatedStock);
    }

    return buildResults;
  }
}
