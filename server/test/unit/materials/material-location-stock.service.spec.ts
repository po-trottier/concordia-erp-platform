import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialStockService } from '../../../src/api/materials/materials/material-stock.service';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { MaterialDocument } from '../../../src/api/materials/materials/schemas/material.schema';
import { MaterialStockDocument } from '../../../src/api/materials/materials/schemas/material-stock.schema';
import { Model } from 'mongoose';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PartDocument } from 'src/api/parts/parts/schemas/part.schema';
import { PartStockDocument } from 'src/api/parts/parts/schemas/part-stock.schema';
import { ProductStockDocument } from 'src/api/products/products/schemas/product-stock.schema';
import { ProductLogDocument } from 'src/api/products/products-logs/schemas/product-log.schema';
import { PartLogDocument } from 'src/api/parts/parts-logs/schemas/part-log.schema';
import { JwtService } from '@nestjs/jwt';

describe('MaterialLocationStockService', () => {
  let materialService: MaterialsService;
  let materialLogsService: MaterialLogsService;
  let materialStockService: MaterialStockService;
  let locationsService: LocationsService;
  let locationDocument: Model<LocationDocument>;
  let materialStockDocument: Model<MaterialStockDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;
  let materialDocument: Model<MaterialDocument>;
  let emitter: EventEmitter2;
  let partDocument: Model<PartDocument>;
  let partStockDocument: Model<PartStockDocument>;
  let productStockDocument: Model<ProductStockDocument>;
  let partLogDocument: Model<PartLogDocument>;
  let productLogDocument: Model<ProductLogDocument>;
  let jwtService: JwtService;

  beforeEach(async () => {
    materialLogsService = new MaterialLogsService(materialLogDocument);
    materialService = new MaterialsService(
      jwtService,
      emitter,
      partDocument,
      materialDocument,
      materialLogDocument,
      materialStockDocument
    );
    locationsService = new LocationsService(
      jwtService,
      emitter,
      locationDocument,
      materialStockDocument,
      partStockDocument,
      productStockDocument,
      materialLogDocument,
      partLogDocument,
      productLogDocument
    );
    materialStockService = new MaterialStockService(
      materialStockDocument,
      materialService,
      materialLogsService,
      locationsService,
    );
  });

  it('should be defined', () => {
    expect(materialStockService).toBeDefined();
  });
});
