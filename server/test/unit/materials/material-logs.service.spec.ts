import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let materialLogsService: MaterialLogsService;
  let materialLogDocument: Model<MaterialLogDocument>;

  beforeEach(async () => {
    materialLogsService = new MaterialLogsService(materialLogDocument);
  });

  it('should be defined', () => {
    expect(materialLogsService).toBeDefined();
  });
});
