import { ProductOrdersService } from '../../../src/api/orders/product-orders.service';
import { ProductOrderDocument } from '../../../src/api/orders/schemas/product-orders.schema';
import { Model } from 'mongoose';

describe('OrdersServices', () => {
  let productOrdersService: ProductOrdersService;
  let productOrderDocument: Model<ProductOrderDocument>;

  beforeEach(async () => {
    productOrdersService = new ProductOrdersService(productOrderDocument);
  });

  it('should be defined', () => {
    expect(productOrdersService).toBeDefined();
  });
});
