import { Model } from 'mongoose';
import { ProductDocument } from '../../../src/api/products/products/schemas/products.schema';
import { ProductStockDocument } from '../../../src/api/products/products/schemas/product-stock.schema';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { PartStockService } from '../../../src/api/parts/parts/part-stock.service';
import { PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { PartStockDocument } from '../../../src/api/parts/parts/schemas/part-stock.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MaterialStockDocument } from 'src/api/materials/materials/schemas/material-stock.schema';
import { MaterialLogDocument } from 'src/api/materials/materials-logs/schemas/material-log.schema';

describe('PartsService', () => {
  let productDocument: Model<ProductDocument>;
  let partsService: PartsService;
  let partLogsService: PartLogsService;
  let locationsService: LocationsService;
  let partStockService: PartStockService;
  let partLogDocument: Model<PartLogDocument>;
  let locationDocument: Model<LocationDocument>;
  let materialStockDocument: Model<MaterialStockDocument>;
  let partStockDocument: Model<PartStockDocument>;
  let productStockDocument: Model<ProductStockDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;
  let partsDocument: Model<PartDocument>;
  let productLogDocument: Model<ProductLogDocument>;
  let emitter: EventEmitter2;

  beforeEach(async () => {
    partsService = new PartsService(
      emitter,
      productDocument,
      partsDocument,
      partLogDocument,
      partStockDocument
    );
    partLogsService = new PartLogsService(partLogDocument);
    locationsService = new LocationsService(
      emitter,
      locationDocument,
      materialStockDocument,
      partStockDocument,
      productStockDocument,
      materialLogDocument,
      partLogDocument,
      productLogDocument
    );
    partLogsService = new PartLogsService(partLogDocument);
    partStockService = new PartStockService(
      partStockDocument,
      partsService,
      partLogsService,
      locationsService,
    );
  });

  it('should be defined', () => {
    expect(partStockService).toBeDefined();
  });
});
