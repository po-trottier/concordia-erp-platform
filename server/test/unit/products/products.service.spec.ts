import { ProductsService } from '../../../src/api/products/products/products.service';
import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import { Model } from 'mongoose';
import {
  ProductDocument,
} from '../../../src/api/products/products/schemas/products.schema';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productLogsService: ProductLogsService;
  let partsDocumentModel: Model<ProductDocument>;

	beforeEach(async () => {
		productsService = new ProductsService(partsDocumentModel, productLogsService);
	});

	it('should be defined', () => {
		expect(productsService).toBeDefined();
	});
});