import { Test, TestingModule } from '@nestjs/testing';
import { PartsController } from '../../../src/api/parts/parts.controller';
import { PartsService } from '../../../src/api/parts/parts.service';

describe('PartsController', () => {
  let controller: PartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartsController],
      providers: [PartsService],
    }).compile();

    controller = module.get<PartsController>(PartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
