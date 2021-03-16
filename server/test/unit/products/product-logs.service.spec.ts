import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import { Model } from 'mongoose';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';

describe('ProductLogsService', () => {
  let productLogsService: ProductLogsService;
  let productLogDocument: Model<ProductLogDocument>;

  beforeEach(async () => {
    productLogsService = new ProductLogsService(productLogDocument);
  });

  it('should be defined', () => {
    expect(productLogsService).toBeDefined();
  });
});
