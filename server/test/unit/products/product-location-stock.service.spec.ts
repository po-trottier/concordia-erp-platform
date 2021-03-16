import { ProductsService } from '../../../src/api/products/products/products.service';
import { ProductLocationStockService } from '../../../src/api/products/products/product-location-stock.service';
import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import { Model } from 'mongoose';
import { ProductDocument } from '../../../src/api/products/products/schemas/products.schema';
import { ProductLocationStockDocument } from '../../../src/api/products/products/schemas/product-location-stock.schema';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productLocationStockService: ProductLocationStockService;
  let productLogsService: ProductLogsService;
  let locationsService: LocationsService;
  let partsDocumentModel: Model<ProductDocument>;
  let productLocationStockDocument: Model<ProductLocationStockDocument>
  let productLogDocument: Model<ProductLogDocument>
  let locationDocument: Model<LocationDocument>

  beforeEach(async () => {
    productsService = new ProductsService(partsDocumentModel);
    productLogsService = new ProductLogsService(productLogDocument);
    locationsService = new LocationsService(locationDocument);
    productLocationStockService = new ProductLocationStockService(productLocationStockDocument, productsService, productLogsService, locationsService);
  });

  it('should be defined', () => {
    expect(productLocationStockService).toBeDefined();
  });
});
