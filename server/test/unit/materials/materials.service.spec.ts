import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialDocument } from '../../../src/api/materials/materials/schemas/material.schema';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { Model } from 'mongoose';
import { PartDocument } from 'src/api/parts/parts/schemas/part.schema';
import { MaterialStockDocument } from 'src/api/materials/materials/schemas/material-stock.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('MaterialsService', () => {
  let materialService: MaterialsService;
  let materialDocument: Model<MaterialDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;
  let partDocument: Model<PartDocument>;
  let materialStockDocument: Model<MaterialStockDocument>;
  let emitter: EventEmitter2;

  beforeEach(async () => {
    materialService = new MaterialsService(
      emitter,
      partDocument,
      materialDocument,
      materialLogDocument,
      materialStockDocument
    );
  });

  it('should be defined', () => {
    expect(materialService).toBeDefined();
  });
});
