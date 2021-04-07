import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialDocument } from '../../../src/api/materials/materials/schemas/material.schema';
import { MaterialOrdersService } from '../../../src/api/orders/material-orders.service';
import { MaterialOrderDocument } from '../../../src/api/orders/schemas/material-orders.schema';
import { Model } from 'mongoose';
import { MaterialStockService } from '../../../src/api/materials/materials/material-stock.service';
import { MaterialStockDocument } from '../../../src/api/materials/materials/schemas/material-stock.schema';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { PartStockDocument } from '../../../src/api/parts/parts/schemas/part-stock.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { PartDocument } from 'src/api/parts/parts/schemas/part.schema';
import { ProductStockDocument } from 'src/api/products/products/schemas/product-stock.schema';
import { ProductLogDocument } from 'src/api/products/products-logs/schemas/product-log.schema';

describe('MaterialOrdersService', () => {
  let materialsService: MaterialsService;
  let materialDocument: Model<MaterialDocument>;
  let materialOrdersService: MaterialOrdersService;
  let materialOrderDocument: Model<MaterialOrderDocument>;
  let materialStockService: MaterialStockService;
  let materialStockDocument: Model<MaterialStockDocument>
  let materialLogsService: MaterialLogsService;
  let materialLogDocument: Model<MaterialLogDocument>;
  let locationsService: LocationsService;
  let locationDocument: Model<LocationDocument>;
  let emitter: EventEmitter2;
  let partDocument: Model<PartDocument>;
  let partLogDocument: Model<PartLogDocument>;
  let productStockDocument: Model<ProductStockDocument>;
  let productLogDocument: Model<ProductLogDocument>;
  let partStockDocument: Model<PartStockDocument>;

  materialsService = new MaterialsService(
    emitter,
    partDocument,
    materialDocument,
    materialLogDocument,
    materialStockDocument
  );
  materialLogsService = new MaterialLogsService(materialLogDocument);
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
  materialStockService = new MaterialStockService(materialStockDocument, materialsService, materialLogsService, locationsService);
  materialOrdersService = new MaterialOrdersService(
    emitter,
    materialOrderDocument,
    materialsService,
    materialStockService
  );

  it('should be defined', () => {
    expect(materialOrdersService).toBeDefined();
  });
});
