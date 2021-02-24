import { PartsController } from '../../../src/api/parts/parts/parts.controller';
import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service'
import { CreatePartDto } from '../../../src/api/parts/parts/dto/create-part.dto';
import { UpdatePartDto } from '../../../src/api/parts/parts/dto/update-part.dto';
import { Model } from 'mongoose';
import { Part, PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';

describe('PartsController', () => {
  
  let partsController: PartsController;
  let partsService: PartsService;
  let partLogsService: PartLogsService;
  let partsDocumentModel: Model<PartDocument>;

  const dummyPart: Part = {
    name: 'Handlebar',
    description: 'Handlebar for bike',
    stock: 1,
  }

  beforeEach(async () => {
    partsService = new PartsService(partsDocumentModel, partLogsService);
    partsController = new PartsController(partsService);
  });

  describe('findAll', () => {
    it('Should return a list of all parts', async () => {
      const result: Part[] = [
        dummyPart,
    ];
      jest.spyOn(partsService, 'findAll').mockImplementation(async () => await result);

      expect(await partsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a from by its username', async () => {
      const result: Part = dummyPart;

      jest.spyOn(partsService, 'findOne').mockImplementation(async () => await result)

      expect(await partsController.findOne(result.name)).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a new part', async () => {
      const result: Part = dummyPart;

      const newPart = new CreatePartDto();
      newPart.name = result.name;
      newPart.description = result.description;
      newPart.stock = result.stock

      jest.spyOn(partsService, 'create').mockImplementation(async () => await result);

      expect(await partsController.create(newPart)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should remove a part by its name', async () => {
      const result: Part = dummyPart
    
      jest.spyOn(partsService, 'remove').mockImplementation(async () => await result);
    
      expect(await partsController.remove(result.name)).toBe(result);
    });
  });

  describe('update', () => {
    it('Should update user attribute values', async () => {
      const result: Part = dummyPart;

      const updatedPart = new UpdatePartDto();
      updatedPart.name = result.name;
      updatedPart.description = result.description;
      updatedPart.stock = result.stock;
      
      jest.spyOn(partsService, 'update').mockImplementation(async () => await result)

      expect(await partsController.update(result.name, updatedPart)).toBe(result);
    });
  });
});
