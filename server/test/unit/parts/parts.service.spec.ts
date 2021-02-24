import { PartsController } from '../../../src/api/parts/parts/parts.controller';
import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service'
import { CreatePartDto } from '../../../src/api/parts/parts/dto/create-part.dto';
import { UpdatePartDto } from '../../../src/api/parts/parts/dto/update-part.dto';
import { Model } from 'mongoose';
import { Part, PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';

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
