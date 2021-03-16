import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { Model } from 'mongoose';
import { PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';

describe('PartsService', () => {
  let partsService: PartsService;
  let partsDocumentModel: Model<PartDocument>;

  beforeEach(async () => {
    partsService = new PartsService(partsDocumentModel);
  });

  it('should be defined', () => {
    expect(partsService).toBeDefined();
  });
});
