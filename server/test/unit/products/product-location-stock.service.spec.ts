import { ProductsService } from '../../../src/api/products/products/products.service';
import { ProductStockService } from '../../../src/api/products/products/product-stock.service';
import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import { Model } from 'mongoose';
import { ProductDocument } from '../../../src/api/products/products/schemas/products.schema';
import { ProductStockDocument } from '../../../src/api/products/products/schemas/product-stock.schema';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { PartStockDocument } from '../../../src/api/parts/parts/schemas/part-stock.schema';
import { MaterialStockDocument } from 'src/api/materials/materials/schemas/material-stock.schema';
import { MaterialLogDocument } from 'src/api/materials/materials-logs/schemas/material-log.schema';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productStockService: ProductStockService;
  let productLogsService: ProductLogsService;
  let locationsService: LocationsService;
  let productStockDocument: Model<ProductStockDocument>;
  let productLogDocument: Model<ProductLogDocument>;
  let locationDocument: Model<LocationDocument>;
  let productDocument: Model<ProductDocument>;
  let partLogDocument: Model<PartLogDocument>;
  let partStockDocument: Model<PartStockDocument>;
  let materialStockDocument: Model<MaterialStockDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;
  let emitter: EventEmitter2;

  beforeEach(async () => {
    productsService = new ProductsService(emitter, productDocument, productLogDocument, productStockDocument);
    productLogsService = new ProductLogsService(productLogDocument);
    locationsService = new LocationsService(
      emitter,
      locationDocument,
      materialStockDocument,
      partStockDocument,
      productStockDocument,
      materialLogDocument,
      partLogDocument,
      productLogDocument
    );
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
