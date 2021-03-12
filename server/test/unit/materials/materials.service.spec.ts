import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialDocument } from '../../../src/api/materials/materials/schemas/material.schema';
import { Model } from 'mongoose';

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
