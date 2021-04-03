import { MaterialsController } from '../../../src/api/materials/materials/materials.controller';
import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { MaterialStockService } from '../../../src/api/materials/materials/material-stock.service';
import { CreateMaterialDto } from '../../../src/api/materials/materials/dto/create-material.dto';
import { UpdateMaterialDto } from '../../../src/api/materials/materials/dto/update-material.dto';
import { UpdateMaterialStockDto } from '../../../src/api/materials/materials/dto/update-material-stock.dto';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { MaterialStock } from '../../../src/api/materials/materials/schemas/material-stock.schema';
import { Model } from 'mongoose';
import {
  Material,
  MaterialDocument,
} from '../../../src/api/materials/materials/schemas/material.schema';
import { MaterialStockDocument } from '../../../src/api/materials/materials/schemas/material-stock.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';

describe('MaterialsController', () => {
  let materialController: MaterialsController;
  let materialService: MaterialsService;
  let materialLogsService: MaterialLogsService;
  let materialStockService: MaterialStockService;
  let locationsService: LocationsService;
  let locationDocument: Model<LocationDocument>;
  let materialStockDocument: Model<MaterialStockDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;
  let materialDocumentModel: Model<MaterialDocument>;

  const dummyMaterial: Material = {
    name: 'Steel',
    density: 2,
    vendorName: 'Steelseries',
    image: 'image',
    price: 5,
  };

  const dummyMaterialStock: MaterialStock = {
    materialId: '123',
    locationId: 'MTL123',
    stock: 50,
  };

  beforeEach(async () => {
    materialLogsService = new MaterialLogsService(materialLogDocument);
    materialService = new MaterialsService(materialDocumentModel);
    locationsService = new LocationsService(locationDocument);
    materialStockService = new MaterialStockService(
      materialStockDocument,
      materialService,
      materialLogsService,
      locationsService,
    );
    materialController = new MaterialsController(
      materialService,
      materialStockService,
    );
  });

  describe('findAll', () => {
    it('Should return a list of all materials.', async () => {
      const result: Material[] = [dummyMaterial];
      jest
        .spyOn(materialService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await materialController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a material from by its username', async () => {
      const result: Material = dummyMaterial;

      jest
        .spyOn(materialService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await materialController.findOne(result.name)).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a new material', async () => {
      const result: Material = dummyMaterial;

      const newMaterial = new CreateMaterialDto();
      newMaterial.name = result.name;
      newMaterial.density = result.density;
      newMaterial.vendorName = result.vendorName;
      newMaterial.image = result.image;
      newMaterial.price = result.price;

      jest
        .spyOn(materialService, 'create')
        .mockImplementation(async () => await result);

      expect(await materialController.create(newMaterial)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should remove a material by its name', async () => {
      const result: Material = dummyMaterial;

      jest
        .spyOn(materialService, 'remove')
        .mockImplementation(async () => await result);

      expect(await materialController.remove(result.name)).toBe(result);
    });
  });

  describe('update', () => {
    it('Should update user attribute values', async () => {
      const result: Material = dummyMaterial;

      const updatedMaterial = new UpdateMaterialDto();
      updatedMaterial.name = result.name;
      updatedMaterial.density = result.density;
      updatedMaterial.vendorName = result.vendorName;
      updatedMaterial.image = result.image;
      updatedMaterial.price = result.price;

      jest
        .spyOn(materialService, 'update')
        .mockImplementation(async () => await result);

      expect(
        await materialController.update(result.name, updatedMaterial),
      ).toBe(result);
    });
  });

  describe('findAllStock', () => {
    it('Should find all materials location stock', async () => {
      const result: MaterialStock[] = [dummyMaterialStock];

      jest
        .spyOn(materialStockService, 'findAll')
        .mockImplementation(async () => await result);

      expect(
        await materialController.findAllStocks(dummyMaterialStock.locationId),
      ).toBe(result);
    });
  });

  describe('findOneStock', () => {
    it("Should find one material's location stock", async () => {
      const result: MaterialStock = dummyMaterialStock;

      jest
        .spyOn(materialStockService, 'findOne')
        .mockImplementation(async () => await result);

      expect(
        await materialController.findOneStock(
          dummyMaterialStock.materialId,
          dummyMaterialStock.locationId,
        ),
      ).toBe(result);
    });
  });

  describe('updateStock', () => {
    it('Should update the stock of a material at a location', async () => {
      const result: MaterialStock = dummyMaterialStock;

      const updatedPartStock = new UpdateMaterialStockDto();
      updatedPartStock.stockBought = 10;
      updatedPartStock.stockUsed = 20;
      const updatedPartStockList: UpdateMaterialStockDto[] = [updatedPartStock];

      jest
        .spyOn(materialStockService, 'update')
        .mockImplementation(async () => await result);

      expect(
        await materialController.updateStock(
          dummyMaterialStock.locationId,
          updatedPartStockList,
        ),
      ).toBe(result);
    });
  });
});
