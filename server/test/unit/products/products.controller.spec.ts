import { ProductsController } from '../../../src/api/products/products/products.controller';
import { ProductsService } from '../../../src/api/products/products/products.service';
import { ProductLocationStockService } from '../../../src/api/products/products/product-location-stock.service';
import { CreateProductDto } from '../../../src/api/products/products/dto/create-product.dto';
import { UpdateProductDto } from '../../../src/api/products/products/dto/update-product.dto';
import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
} from '../../../src/api/products/products/schemas/products.schema';
import { ProductLocationStockDocument } from '../../../src/api/products/products/schemas/product-location-stock.schema';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';

describe('PartsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let productLocationStockService: ProductLocationStockService;
  let productLogsService: ProductLogsService;
  let locationsService: LocationsService;
  let partsDocumentModel: Model<ProductDocument>;
  let productLocationStockDocument: Model<ProductLocationStockDocument>
  let productLogDocument: Model<ProductLogDocument>
  let locationDocument: Model<LocationDocument>

  const dummyProduct: Product = {
    name: 'Canondale Bike',
    price: 1000,
    parts: [],
    properties: [],
  };

  beforeEach(async () => {
    productsService = new ProductsService(partsDocumentModel);
    productLogsService = new ProductLogsService(productLogDocument);
    locationsService = new LocationsService(locationDocument);
    productLocationStockService = new ProductLocationStockService(productLocationStockDocument, productsService, productLogsService, locationsService);
    productsController = new ProductsController(productsService, productLocationStockService);
  });

  describe('findAll', () => {
    it('Should return a list of all products', async () => {
      const result: Product[] = [dummyProduct];
      jest
        .spyOn(productsService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await productsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a product by its name', async () => {
      const result: Product = dummyProduct;

      jest
        .spyOn(productsService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await productsController.findOne(result.name)).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a new product', async () => {
      const result: Product = dummyProduct;

      const newProduct = new CreateProductDto();
      newProduct.name = result.name;
      newProduct.price = result.price;
      newProduct.properties = result.properties;
      newProduct.parts = result.parts;

      jest
        .spyOn(productsService, 'create')
        .mockImplementation(async () => await result);

      expect(await productsController.create(newProduct)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should remove a product by its name', async () => {
      const result: Product = dummyProduct;

      jest
        .spyOn(productsService, 'remove')
        .mockImplementation(async () => await result);

      expect(await productsController.remove(result.name)).toBe(result);
    });
  });

  describe('update', () => {
    it('Should update product attribute values', async () => {
      const result: Product = dummyProduct;

      const updatedProduct = new UpdateProductDto();
      updatedProduct.name = result.name;
      updatedProduct.price = result.price;
      updatedProduct.properties = result.properties;
      updatedProduct.parts = result.parts;

      jest
        .spyOn(productsService, 'update')
        .mockImplementation(async () => await result);

      expect(await productsController.update(result.name, updatedProduct)).toBe(
        result,
      );
    });
  });
});
