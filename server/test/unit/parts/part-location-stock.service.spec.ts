import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { PartStockService } from '../../../src/api/parts/parts/part-stock.service';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { Model } from 'mongoose';
import { PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { PartStockDocument } from '../../../src/api/parts/parts/schemas/part-stock.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';

describe('PartsService', () => {
  let partsService: PartsService;
  let partLogsService: PartLogsService;
  let locationsService: LocationsService;
  let partStockService: PartStockService;
  let partLogDocument: Model<PartLogDocument>;
  let locationDocument: Model<LocationDocument>;
  let partsDocumentModel: Model<PartDocument>;
  let partStockDocument: Model<PartStockDocument>;

  beforeEach(async () => {
    partsService = new PartsService(partsDocumentModel);
    partLogsService = new PartLogsService(partLogDocument);
    locationsService = new LocationsService(locationDocument);
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
