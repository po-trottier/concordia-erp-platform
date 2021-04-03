import { ProductLogsController } from '../../../src/api/products/products-logs/product-logs.controller';
import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import {
  ProductLog,
  ProductLogDocument,
} from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { Model } from 'mongoose';

describe('ProductLogsController', () => {
  let productLogsController: ProductLogsController;
  let productLogsService: ProductLogsService;
  let productLogDocument: Model<ProductLogDocument>;

  const dummyPartLog: ProductLog = {
    productId: '1234',
    locationId: 'MTL123',
    date: new Date(),
    stock: 50,
    stockBuilt: 20,
    stockUsed: 0,
  };

  beforeEach(async () => {
    productLogsService = new ProductLogsService(productLogDocument);
    productLogsController = new ProductLogsController(productLogsService);
  });

  describe('findOne', () => {
    it('Should find a single product log by product and location ID', async () => {
      const result: ProductLog[] = [dummyPartLog];

      jest
        .spyOn(productLogsService, 'findOne')
        .mockImplementation(async () => await result);

      expect(
        await productLogsController.findOne(
          dummyPartLog.productId,
          dummyPartLog.locationId,
        ),
      ).toBe(result);
    });
  });

  describe('findAll', () => {
    it('Should find all product logs by location ID', async () => {
      const result: ProductLog[] = [dummyPartLog];

      jest
        .spyOn(productLogsService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await productLogsController.findAll(dummyPartLog.locationId)).toBe(
        result,
      );
    });
  });
});
