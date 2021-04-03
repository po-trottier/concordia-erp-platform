import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialDocument } from '../../../src/api/materials/materials/schemas/material.schema';
import { MaterialOrdersService } from '../../../src/api/orders/material-orders.service';
import { MaterialOrderDocument } from '../../../src/api/orders/schemas/material-orders.schema';
import { Model } from 'mongoose';

describe('MaterialsService', () => {
  let materialService: MaterialsService;
  let materialDocumentModel: Model<MaterialDocument>;
  let materialOrdersService: MaterialOrdersService;
  let materialOrderDocument: Model<MaterialOrderDocument>;

  beforeEach(async () => {
    materialService = new MaterialsService(materialDocumentModel);
    materialOrdersService = new MaterialOrdersService(
      materialOrderDocument,
      materialService,
    );
  });

  it('should be defined', () => {
    expect(materialOrdersService).toBeDefined();
  });
});
