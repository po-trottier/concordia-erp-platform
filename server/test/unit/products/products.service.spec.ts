import { ProductsService } from '../../../src/api/products/products.service';
import { Model } from 'mongoose';
import {
  ProductDocument,
} from '../../../src/api/products/schemas/products.schema';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let partsDocumentModel: Model<ProductDocument>;

	beforeEach(async () => {
		productsService = new ProductsService(partsDocumentModel);
	});

	it('should be defined', () => {
		expect(productsService).toBeDefined();
	});
});