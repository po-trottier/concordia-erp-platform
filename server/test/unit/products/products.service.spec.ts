import { ProductsService } from '../../../src/api/products/products/products.service';
import { Model } from 'mongoose';
import { ProductDocument } from '../../../src/api/products/products/schemas/products.schema';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { ProductStockDocument } from '../../../src/api/products/products/schemas/product-stock.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productDocument: Model<ProductDocument>;
  let productLogDocument: Model<ProductLogDocument>
  let productStockDocument: Model<ProductStockDocument>;
  let emitter: EventEmitter2;
  let jwtService: JwtService;

  beforeEach(async () => {
    productsService = new ProductsService(
      jwtService,
      emitter,
      productDocument,
      productLogDocument,
      productStockDocument
    );
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });
});
