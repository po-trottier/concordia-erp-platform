import { ProductsService } from '../../../src/api/products/products/products.service';
import { ProductStockService } from '../../../src/api/products/products/product-stock.service';
import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import { Model } from 'mongoose';
import { ProductDocument } from '../../../src/api/products/products/schemas/products.schema';
import { ProductStockDocument } from '../../../src/api/products/products/schemas/product-stock.schema';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productStockService: ProductStockService;
  let productLogsService: ProductLogsService;
  let locationsService: LocationsService;
  let partsDocumentModel: Model<ProductDocument>;
  let productStockDocument: Model<ProductStockDocument>;
  let productLogDocument: Model<ProductLogDocument>;
  let locationDocument: Model<LocationDocument>;

  beforeEach(async () => {
    productsService = new ProductsService(partsDocumentModel);
    productLogsService = new ProductLogsService(productLogDocument);
    locationsService = new LocationsService(locationDocument);
    productStockService = new ProductStockService(
      productStockDocument,
      productsService,
      productLogsService,
      locationsService,
    );
  });

  it('should be defined', () => {
    expect(productStockService).toBeDefined();
  });
});
