import { MaterialLogsController } from '../../../src/api/materials/materials-logs/material-logs.controller';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLog, MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { Model } from 'mongoose';

describe('MaterialLogsController', () => {
  let materialLogsController: MaterialLogsController;
  let materialLogsService: MaterialLogsService;
  let materialLogDocument: Model<MaterialLogDocument>;

  const dummyMaterialLog: MaterialLog = {
    materialId: '1234',
    locationId: 'MTL123',
    date: new Date,
    stock: 50,
    stockBought: 20,
    stockUsed: 0,
  };

  beforeEach(async () => {
    materialLogsService = new MaterialLogsService(materialLogDocument);
    materialLogsController = new MaterialLogsController(materialLogsService);
  });

  describe('findOne', () => {
    it('Should find a single material log by material and location ID', async () => {
      const result: MaterialLog[] = [dummyMaterialLog];

      jest
        .spyOn(materialLogsService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await materialLogsController.findOne(dummyMaterialLog.materialId, dummyMaterialLog.locationId)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('Should find all material logs by location ID', async () => {
      const result: MaterialLog[] = [dummyMaterialLog];

      jest
        .spyOn(materialLogsService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await materialLogsController.findAll(dummyMaterialLog.locationId)).toBe(result);
    });
  });
});
