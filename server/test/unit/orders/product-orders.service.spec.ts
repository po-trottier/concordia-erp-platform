import { ProductsService } from '../../../src/api/products/products/products.service';
import { ProductDocument } from '../../../src/api/products/products/schemas/products.schema';
import { ProductOrdersService } from '../../../src/api/orders/product-orders.service';
import { ProductOrderDocument } from '../../../src/api/orders/schemas/product-orders.schema';
import { Model } from 'mongoose';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productDocument: Model<ProductDocument>;
  let productOrdersService: ProductOrdersService;
  let productOrderDocument: Model<ProductOrderDocument>;

  beforeEach(async () => {
    productsService = new ProductsService(productDocument);
    productOrdersService = new ProductOrdersService(
      productOrderDocument,
      productsService,
    );
  });

  it('should be defined', () => {
    expect(productOrdersService).toBeDefined();
  });
});
