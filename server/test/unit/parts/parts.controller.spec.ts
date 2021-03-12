import { PartsController } from '../../../src/api/parts/parts/parts.controller';
import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { PartLocationStockService } from '../../../src/api/parts/parts/part-location-stock.service';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { CreatePartDto } from '../../../src/api/parts/parts/dto/create-part.dto';
import { UpdatePartDto } from '../../../src/api/parts/parts/dto/update-part.dto';
import { UpdatePartStockDto } from '../../../src/api/parts/parts/dto/update-part-stock.dto';
import { Model } from 'mongoose';
import {
  Part,
  PartDocument,
} from '../../../src/api/parts/parts/schemas/part.schema';
import {
  PartLocationStock,
  PartLocationStockDocument
} from '../../../src/api/parts/parts/schemas/part-location-stock.schema';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';

describe('PartsController', () => {
  let partsController: PartsController;
  let partsService: PartsService;
  let partLogsService: PartLogsService;
  let locationsService: LocationsService;
  let partLocationStockService: PartLocationStockService;
  let partLogDocument: Model<PartLogDocument>;
  let locationDocument: Model<LocationDocument>;
  let partsDocumentModel: Model<PartDocument>;
  let partLocationStockDocument: Model<PartLocationStockDocument>

  const dummyPart: Part = {
    name: 'Handlebar',
    materials: [],
  };

  const dummyPartLocationStock: PartLocationStock = {
    partId: '1234',
    locationId: 'MTL123',
    stock: 50
  }

  beforeEach(async () => {
    partsService = new PartsService(partsDocumentModel);
    partLogsService = new PartLogsService(partLogDocument);
    locationsService = new LocationsService(locationDocument);
    partLocationStockService = new PartLocationStockService(partLocationStockDocument, partsService, partLogsService, locationsService);
    partsController = new PartsController(partsService, partLocationStockService);
  });

  describe('findAll', () => {
    it('Should return a list of all parts', async () => {
      const result: Part[] = [dummyPart];
      jest
        .spyOn(partsService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await partsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a from by its username', async () => {
      const result: Part = dummyPart;

      jest
        .spyOn(partsService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await partsController.findOne(result.name)).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a new part', async () => {
      const result: Part = dummyPart;

      const newPart = new CreatePartDto();
      newPart.name = result.name;
      newPart.materials = result.materials;

      jest
        .spyOn(partsService, 'create')
        .mockImplementation(async () => await result);

      expect(await partsController.create(newPart)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should remove a part by its name', async () => {
      const result: Part = dummyPart;

      jest
        .spyOn(partsService, 'remove')
        .mockImplementation(async () => await result);

      expect(await partsController.remove(result.name)).toBe(result);
    });
  });

  describe('update', () => {
    it('Should update user attribute values', async () => {
      const result: Part = dummyPart;

      const updatedPart = new UpdatePartDto();
      updatedPart.name = result.name;
      updatedPart.materials = result.materials;

      jest
        .spyOn(partsService, 'update')
        .mockImplementation(async () => await result);

      expect(await partsController.update(result.name, updatedPart)).toBe(
        result,
      );
    });
  });

  describe('findAllLocationStock', () => {
    it('Should find all parts location stock', async () => {
      const result: PartLocationStock[] = [dummyPartLocationStock];

      jest
        .spyOn(partLocationStockService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await partsController.findAllLocationStock(dummyPartLocationStock.locationId)).toBe(result);
    });
  });

  describe('findOneLocationStock', () => {
    it('Should find one part\'s location stock', async () => {
      const result: PartLocationStock = dummyPartLocationStock;

      jest
        .spyOn(partLocationStockService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await partsController.findOneLocationStock(dummyPartLocationStock.partId, dummyPartLocationStock.locationId)).toBe(result);
    });
  });

  describe('updateStock', () => {
    it('Should update the stock of a part at a location', async () => {
      const result: PartLocationStock = dummyPartLocationStock;

      const updatedPartStock = new UpdatePartStockDto();
      updatedPartStock.stockBuilt = 10;
      updatedPartStock.stockUsed = 20;

      jest
        .spyOn(partLocationStockService, 'update')
        .mockImplementation(async () => await result);

      expect(await partsController.updateStock(dummyPartLocationStock.partId, dummyPartLocationStock.locationId, updatedPartStock)).toBe(result);
    });
  });
});
