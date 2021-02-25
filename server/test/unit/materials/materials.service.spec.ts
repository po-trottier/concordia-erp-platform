import { MaterialsService } from '../../../src/api/materials/materials.service';
import { Model } from 'mongoose';
import { MaterialDocument } from '../../../src/api/materials/schemas/material.schema';

describe('UsersService', () => {
  let materialService: MaterialsService;
  let materialDocumentModel: Model<MaterialDocument>;

  beforeEach(async () => {
    materialService = new MaterialsService(materialDocumentModel);
  });

  it('should be defined', () => {
    expect(materialService).toBeDefined();
  });
});
