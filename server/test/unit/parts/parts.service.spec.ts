import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { Model } from 'mongoose';
import { PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';
import { PartStockDocument } from '../../../src/api/parts/parts/schemas/part-stock.schema';
import { ProductDocument } from '../../../src/api/products/products/schemas/products.schema';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';

describe('PartsService', () => {
  let partsService: PartsService;
  let partLogDocument: Model<PartLogDocument>;
  let partStockDocument: Model<PartStockDocument>;
  let partsDocument: Model<PartDocument>;
  let productDocument: Model<ProductDocument>;
  let emitter: EventEmitter2;
  let jwtService: JwtService;

  beforeEach(async () => {
    partsService = new PartsService(
      jwtService,
      emitter,
      productDocument,
      partsDocument,
      partLogDocument,
      partStockDocument
    );
  });

  it('should be defined', () => {
    expect(partsService).toBeDefined();
  });
});
