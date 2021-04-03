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


describe('MaterialsService', () => {
  let materialService: MaterialsService;
  let materialDocumentModel: Model<MaterialDocument>;
  let materialOrdersService: MaterialOrdersService;
  let materialOrderDocument: Model<MaterialOrderDocument>;
  let materialStockService: MaterialStockService;
  let materialStockDocument: Model<MaterialStockDocument>
  let materialLogsService: MaterialLogsService;
  let materialLogDocument: Model<MaterialLogDocument>;
  let locationsService: LocationsService;
  let locationDocument: Model<LocationDocument>;

  beforeEach(async () => {
    materialService = new MaterialsService(materialDocumentModel);
    materialLogsService = new MaterialLogsService(materialLogDocument);
    locationsService = new LocationsService(locationDocument);
    materialStockService = new MaterialStockService(materialStockDocument, materialService, materialLogsService, locationsService);
    materialOrdersService = new MaterialOrdersService(
      materialOrderDocument,
      materialService,
      materialStockService
    );
  });

  it('should be defined', () => {
    expect(materialOrdersService).toBeDefined();
  });
});
