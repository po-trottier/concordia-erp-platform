import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { Model } from 'mongoose';
import {
  MaterialDocument,
} from '../../../src/api/materials/materials/schemas/material.schema';

describe('UsersService', () => {
  let materialService: MaterialsService;
  let materialLogsService: MaterialLogsService;
  let materialLogDocument: Model<MaterialLogDocument>;
  let materialDocumentModel: Model<MaterialDocument>;

  beforeEach(async () => {
    materialLogsService = new MaterialLogsService(materialLogDocument);
    materialService = new MaterialsService(materialDocumentModel, materialLogsService);
  });

  it('should be defined', () => {
    expect(materialService).toBeDefined();
  });
});
