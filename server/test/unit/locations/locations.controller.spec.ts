import { LocationsController } from '../../../src/api/locations/locations.controller';
import { CreateLocationDto } from '../../../src/api/locations/dto/create-location.dto';
import { UpdateLocationDto } from '../../../src/api/locations/dto/update-location.dto';
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

describe('LocationsController', () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;
  let partLogDocument: Model<PartLogDocument>;
  let locationDocument: Model<LocationDocument>;
  let materialStockDocument: Model<MaterialStockDocument>;
  let partStockDocument: Model<PartStockDocument>;
  let productStockDocument: Model<ProductStockDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;
  let productLogDocument: Model<ProductLogDocument>;
  let emitter: EventEmitter2;

  const dummyLocation: Location = {
    name: 'Montreal Warehouse',
  };

  beforeEach(() => {
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
    locationsController = new LocationsController(locationsService);
  });

  describe('findAll', () => {
    it('Should return a list of all locations', async () => {
      const result: Location[] = [dummyLocation];
      jest
        .spyOn(locationsService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await locationsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a location by its id', async () => {
      const result: Location = dummyLocation;

      jest
        .spyOn(locationsService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await locationsController.findOne('123')).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a location', async () => {
      const result: Location = dummyLocation;

      const newLocation = new CreateLocationDto();
      newLocation.name = result.name;

      jest
        .spyOn(locationsService, 'create')
        .mockImplementation(async () => await result);

      expect(await locationsController.create(newLocation)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should delete a location by its id', async () => {
      const result: Location = dummyLocation;

      jest
        .spyOn(locationsService, 'remove')
        .mockImplementation(async () => await result);

      expect(await locationsController.remove('123')).toBe(result);
    });
  });

  describe('update', () => {
    it('Should update location attribute values by its id', async () => {
      const result: Location = dummyLocation;

      const newLocation = new UpdateLocationDto();
      newLocation.name = result.name;

      jest
        .spyOn(locationsService, 'update')
        .mockImplementation(async () => await result);

      expect(await locationsController.update('123', newLocation)).toBe(result);
    });
  });
});
