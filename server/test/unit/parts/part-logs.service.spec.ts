import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { Model } from 'mongoose';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';

describe('PartLogsService', () => {
  let partLogsService: PartLogsService;
  let partLogDocument: Model<PartLogDocument>;

  beforeEach(async () => {
    partLogsService = new PartLogsService(partLogDocument);
  });

  it('should be defined', () => {
    expect(partLogsService).toBeDefined();
  });
});
