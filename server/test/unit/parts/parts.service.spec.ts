import { Test, TestingModule } from '@nestjs/testing';
import { PartsService } from './parts.service';

describe('PartsService', () => {
  let service: PartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartsService],
    }).compile();

    service = module.get<PartsService>(PartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
