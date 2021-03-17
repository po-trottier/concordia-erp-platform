import { PartLogsController } from '../../../src/api/parts/parts-logs/part-logs.controller';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { PartLog, PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { Model } from 'mongoose';

describe('PartLogsController', () => {
  let partLogsController: PartLogsController;
  let partLogsService: PartLogsService;
  let partLogDocument: Model<PartLogDocument>;

  const dummyPartLog: PartLog = {
    partId: '1234',
    locationId: 'MTL123',
    date: new Date,
    stock: 50,
    stockBuilt: 20,
    stockUsed: 0,
  };

  beforeEach(async () => {
    partLogsService = new PartLogsService(partLogDocument);
    partLogsController = new PartLogsController(partLogsService);
  });

  describe('findOne', () => {
    it('Should find a single part log by part and location ID', async () => {
      const result: PartLog[] = [dummyPartLog];

      jest
        .spyOn(partLogsService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await partLogsController.findOne(dummyPartLog.partId, dummyPartLog.locationId)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('Should find all part logs by location ID', async () => {
      const result: PartLog[] = [dummyPartLog];

      jest
        .spyOn(partLogsService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await partLogsController.findAll(dummyPartLog.locationId)).toBe(result);
    });
  });
});
