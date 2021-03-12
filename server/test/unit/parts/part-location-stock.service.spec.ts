import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { PartLocationStockService } from '../../../src/api/parts/parts/part-location-stock.service';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { Model } from 'mongoose';
import { PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { PartLocationStockDocument } from '../../../src/api/parts/parts/schemas/part-location-stock.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';

describe('PartLocationStockService', () => {

  let partsService: PartsService;
  let partLogsService: PartLogsService;
  let locationsService: LocationsService;
  let partLocationStockService: PartLocationStockService;
  let partLogDocument: Model<PartLogDocument>;
  let locationDocument: Model<LocationDocument>;
  let partsDocumentModel: Model<PartDocument>;
  let partLocationStockDocument: Model<PartLocationStockDocument>

  beforeEach(async () => {
    partsService = new PartsService(partsDocumentModel);
    partLogsService = new PartLogsService(partLogDocument);
    locationsService = new LocationsService(locationDocument);
    partLocationStockService = new PartLocationStockService(partLocationStockDocument, partsService, partLogsService, locationsService);
  });

  it('should be defined', () => {
    expect(partLocationStockService).toBeDefined();
  });
});
