import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialLocationStockService } from '../../../src/api/materials/materials/material-location-stock.service';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { MaterialDocument } from '../../../src/api/materials/materials/schemas/material.schema';
import { MaterialLocationStockDocument } from '../../../src/api/materials/materials/schemas/material-location-stock.schema';
import { Model } from 'mongoose';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';

describe('MaterialsService', () => {
	let materialService: MaterialsService;
	let materialLogsService: MaterialLogsService;
	let materialLocationStockService: MaterialLocationStockService;
	let locationsService: LocationsService;
	let locationDocument: Model<LocationDocument>;
	let materialLocationStockDocument: Model<MaterialLocationStockDocument>;
	let materialLogDocument: Model<MaterialLogDocument>;
	let materialDocumentModel: Model<MaterialDocument>;

  beforeEach(async () => {
    materialLogsService = new MaterialLogsService(materialLogDocument);
    materialService = new MaterialsService(materialDocumentModel);
    locationsService = new LocationsService(locationDocument);
    materialLocationStockService = new MaterialLocationStockService(materialLocationStockDocument, materialService, materialLogsService, locationsService);
  });

  it('should be defined', () => {
    expect(materialLocationStockService).toBeDefined();
  });
});
