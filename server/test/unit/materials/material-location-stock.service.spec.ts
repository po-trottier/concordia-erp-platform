import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialStockService } from '../../../src/api/materials/materials/material-stock.service';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { MaterialDocument } from '../../../src/api/materials/materials/schemas/material.schema';
import { MaterialStockDocument } from '../../../src/api/materials/materials/schemas/material-stock.schema';
import { Model } from 'mongoose';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';

describe('MaterialsService', () => {
  let materialService: MaterialsService;
  let materialLogsService: MaterialLogsService;
  let materialStockService: MaterialStockService;
  let locationsService: LocationsService;
  let locationDocument: Model<LocationDocument>;
  let materialStockDocument: Model<MaterialStockDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;
  let materialDocumentModel: Model<MaterialDocument>;

  beforeEach(async () => {
    materialLogsService = new MaterialLogsService(materialLogDocument);
    materialService = new MaterialsService(materialDocumentModel);
    locationsService = new LocationsService(locationDocument);
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
