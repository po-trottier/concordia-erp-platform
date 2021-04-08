import { Model } from 'mongoose';
import { ProductStockDocument } from '../../../src/api/products/products/schemas/product-stock.schema';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationDocument, Location } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { PartStockDocument } from '../../../src/api/parts/parts/schemas/part-stock.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MaterialStockDocument } from 'src/api/materials/materials/schemas/material-stock.schema';
import { MaterialLogDocument } from 'src/api/materials/materials-logs/schemas/material-log.schema';
import { JwtService } from '@nestjs/jwt';

describe('LocationsService', () => {
  let locationsService: LocationsService;
  let partLogDocument: Model<PartLogDocument>;
  let locationDocument: Model<LocationDocument>;
  let materialStockDocument: Model<MaterialStockDocument>;
  let partStockDocument: Model<PartStockDocument>;
  let productStockDocument: Model<ProductStockDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;
  let productLogDocument: Model<ProductLogDocument>;
  let emitter: EventEmitter2;
  let jwtService: JwtService ;

  beforeEach(() => {
    locationsService = new LocationsService(
      jwtService,
      emitter,
      locationDocument,
      materialStockDocument,
      partStockDocument,
      productStockDocument,
      materialLogDocument,
      partLogDocument,
      productLogDocument
    );
  });

  it('should be defined', () => {
    expect(locationsService).toBeDefined();
  });
});
