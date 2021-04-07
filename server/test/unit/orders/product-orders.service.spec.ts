import { ProductsService } from '../../../src/api/products/products/products.service';
import { ProductDocument } from '../../../src/api/products/products/schemas/products.schema';
import { ProductOrdersService } from '../../../src/api/orders/product-orders.service';
import { ProductOrderDocument } from '../../../src/api/orders/schemas/product-orders.schema';
import { Model } from 'mongoose';
import { ProductStockService } from '../../../src/api/products/products/product-stock.service';
import { ProductStockDocument } from '../../../src/api/products/products/schemas/product-stock.schema';
import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { PartStockDocument } from '../../../src/api/parts/parts/schemas/part-stock.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { MaterialStockDocument } from 'src/api/materials/materials/schemas/material-stock.schema';
import { MaterialLogDocument } from 'src/api/materials/materials-logs/schemas/material-log.schema';

describe('ProductOrdersService', () => {
  let productsService: ProductsService;
  let productDocument: Model<ProductDocument>;
  let productOrdersService: ProductOrdersService;
  let productOrderDocument: Model<ProductOrderDocument>;
  let productStockService: ProductStockService;
  let productStockDocument: Model<ProductStockDocument>
  let productLogsService: ProductLogsService;
  let productLogDocument: Model<ProductLogDocument>;
  let locationsService: LocationsService;
  let locationDocument: Model<LocationDocument>;
  let emitter: EventEmitter2;
  let partLogDocument: Model<PartLogDocument>;
  let materialStockDocument: Model<MaterialStockDocument>;
  let partStockDocument: Model<PartStockDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;

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
  productStockService = new ProductStockService(productStockDocument, productsService, productLogsService, locationsService);
  productOrdersService = new ProductOrdersService(
    emitter,
    productOrderDocument,
    productsService,
    productStockService
  );

  it('should be defined', () => {
    expect(productOrdersService).toBeDefined();
  });
});
