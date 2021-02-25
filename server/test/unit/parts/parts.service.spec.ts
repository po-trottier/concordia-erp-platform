import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { Model } from 'mongoose';
import { PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';

describe('PartsService', () => {
  let partsService: PartsService;
  let partLogsService: PartLogsService;
  let partsDocumentModel: Model<PartDocument>;

  beforeEach(async () => {
    partsService = new PartsService(partsDocumentModel, partLogsService);
  });

  it('should be defined', () => {
    expect(partsService).toBeDefined();
  });
});
