import { PartsController } from '../../../src/api/parts/parts/parts.controller';
import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { PartBuilderService } from '../../../src/api/parts/parts/part-builder.service';
import { PartStockService } from '../../../src/api/parts/parts/part-stock.service';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { CreatePartDto } from '../../../src/api/parts/parts/dto/create-part.dto';
import { UpdatePartDto } from '../../../src/api/parts/parts/dto/update-part.dto';
import { BuildPartDto } from '../../../src/api/parts/parts/dto/build-part.dto';
import { UpdatePartStockDto } from '../../../src/api/parts/parts/dto/update-part-stock.dto';
import { Model } from 'mongoose';
import {
  Part,
  PartDocument,
} from '../../../src/api/parts/parts/schemas/part.schema';
import {
  PartStock,
  PartStockDocument,
} from '../../../src/api/parts/parts/schemas/part-stock.schema';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialDocument } from '../../../src/api/materials/materials/schemas/material.schema';
import { MaterialStockService } from '../../../src/api/materials/materials/material-stock.service';
import { MaterialStockDocument } from '../../../src/api/materials/materials/schemas/material-stock.schema';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';

describe('PartsController', () => {
  let partsController: PartsController;
  let partsService: PartsService;
  let partLogsService: PartLogsService;
  let locationsService: LocationsService;
  let partStockService: PartStockService;
  let partLogDocument: Model<PartLogDocument>;
  let locationDocument: Model<LocationDocument>;
  let partsDocumentModel: Model<PartDocument>;
  let partStockDocument: Model<PartStockDocument>;
  let materialService: MaterialsService;
  let materialDocument: Model<MaterialDocument>;
  let materialStockService: MaterialStockService;
  let materialStockDocument: Model<MaterialStockDocument>;
  let materialLogsService: MaterialLogsService;
  let materialLogDocument: Model<MaterialLogDocument>;
  let partBuilderService: PartBuilderService;

  const dummyPart: Part = {
    name: 'Handlebar',
    materials: [],
  };

  const dummyPartStock: PartStock = {
    partId: '1234',
    locationId: 'MTL123',
    stock: 50,
  };

  beforeEach(async () => {
    partsService = new PartsService(partsDocumentModel);
    partLogsService = new PartLogsService(partLogDocument);
    locationsService = new LocationsService(locationDocument);
    partStockService = new PartStockService(
      partStockDocument,
      partsService,
      partLogsService,
      locationsService,
    );
    materialService = new MaterialsService(materialDocument);
    materialLogsService = new MaterialLogsService(materialLogDocument);
    materialStockService = new MaterialStockService(
      materialStockDocument,
      materialService,
      materialLogsService,
      locationsService
    );
    partBuilderService = new PartBuilderService(partsService, materialStockService, partStockService);
    partsController = new PartsController(partsService, partStockService, partBuilderService);
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

  describe('build', () => {
    it('Should build a new part', async () => {
      const result: PartStock[] = [dummyPartStock];

      const newPartStock = new BuildPartDto();
      newPartStock.partId = result[0].partId;
      newPartStock.stockBuilt = result[0].stock;

      jest
        .spyOn(partBuilderService, 'build')
        .mockImplementation(async () => await result);

      expect(await partsController.build(dummyPartStock.locationId, [newPartStock])).toBe(result);
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

  describe('findAllStock', () => {
    it('Should find all parts location stock', async () => {
      const result: PartStock[] = [dummyPartStock];

      jest
        .spyOn(partStockService, 'findAll')
        .mockImplementation(async () => await result);

      expect(
        await partsController.findAllStocks(dummyPartStock.locationId),
      ).toBe(result);
    });
  });

  describe('findOneStock', () => {
    it("Should find one part's location stock", async () => {
      const result: PartStock = dummyPartStock;

      jest
        .spyOn(partStockService, 'findOne')
        .mockImplementation(async () => await result);

      expect(
        await partsController.findOneStock(
          dummyPartStock.partId,
          dummyPartStock.locationId,
        ),
      ).toBe(result);
    });
  });

  describe('updateStock', () => {
    it('Should update the stock of a part at a location', async () => {
      const result: PartStock[] = [dummyPartStock];

      const updatedPartStock = new UpdatePartStockDto();
      updatedPartStock.stockBuilt = 10;
      updatedPartStock.stockUsed = 20;

      jest
        .spyOn(partStockService, 'update')
        .mockImplementation(async () => await result);

      expect(
        await partsController.updateStock(dummyPartStock.locationId, [
          updatedPartStock,
        ]),
      ).toBe(result);
    });
  });
});
