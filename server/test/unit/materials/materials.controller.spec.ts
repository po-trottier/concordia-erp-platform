import { MaterialsController } from '../../../src/api/materials/materials.controller';
import { MaterialsService } from '../../../src/api/materials/materials.service';
import { CreateMaterialDto } from '../../../src/api/materials/dto/create-material.dto';
import { UpdateMaterialDto } from '../../../src/api/materials/dto/update-material.dto';
import { Model } from 'mongoose';
import {
  Material,
  MaterialDocument,
} from '../../../src/api/materials/schemas/material.schema';

describe('PartsController', () => {
  let materialController: MaterialsController;
  let materialService: MaterialsService;
  let materialDocumentModel: Model<MaterialDocument>;

  const dummyMaterial: Material = {
    name: 'Steel',
    stock: 1,
    density: 2,
    vendorName: 'Steelseries',
    image: 'image',
    price: 5,
  };

  beforeEach(async () => {
    materialService = new MaterialsService(materialDocumentModel);
    materialController = new MaterialsController(materialService);
  });

  describe('findAll', () => {
    it('Should return a list of all parts', async () => {
      const result: Material[] = [dummyMaterial];
      jest
        .spyOn(materialService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await materialController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a from by its username', async () => {
      const result: Material = dummyMaterial;

      jest
        .spyOn(materialService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await materialController.findOne(result.name)).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a new part', async () => {
      const result: Material = dummyMaterial;

      const newMaterial = new CreateMaterialDto();
      newMaterial.name = result.name;
      newMaterial.stock = result.stock;
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
    it('Should remove a part by its name', async () => {
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
      updatedMaterial.stock = result.stock;
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
});
