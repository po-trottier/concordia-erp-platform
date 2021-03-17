import { ProductsController } from '../../../src/api/products/products/products.controller';
import { ProductsService } from '../../../src/api/products/products/products.service';
import { ProductLocationStockService } from '../../../src/api/products/products/product-location-stock.service';
import { ProductBuilderService } from '../../../src/api/products/products/product-builder.service';
import { CreateProductDto } from '../../../src/api/products/products/dto/create-product.dto';
import { UpdateProductDto } from '../../../src/api/products/products/dto/update-product.dto';
import { BuildProductDto } from '../../../src/api/products/products/dto/build-product.dto';
import { UpdateProductStockDto } from '../../../src/api/products/products/dto/update-product-stock.dto';
import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
} from '../../../src/api/products/products/schemas/products.schema';
import { ProductLocationStock } from '../../../src/api/products/products/schemas/product-location-stock.schema';
import { ProductLocationStockDocument } from '../../../src/api/products/products/schemas/product-location-stock.schema';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';

import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { PartLocationStockService } from '../../../src/api/parts/parts/part-location-stock.service';
import { PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { PartLocationStockDocument } from '../../../src/api/parts/parts/schemas/part-location-stock.schema';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let productDocument: Model<ProductDocument>
  let productLocationStockService: ProductLocationStockService;
  let productLogsService: ProductLogsService;
  let productBuilderService: ProductBuilderService;
  let productLocationStockDocument: Model<ProductLocationStockDocument>
  let productLogDocument: Model<ProductLogDocument>
  let locationDocument: Model<LocationDocument>

  let partsService: PartsService;
  let partLogsService: PartLogsService;
  let locationsService: LocationsService;
  let partLocationStockService: PartLocationStockService;
  let partLogDocument: Model<PartLogDocument>;
  let partsDocumentModel: Model<PartDocument>;
  let partLocationStockDocument: Model<PartLocationStockDocument>

  const dummyProduct: Product = {
    name: 'Canondale Bike',
    price: 1000,
    parts: [],
    properties: [],
  };

  const dummyProductLocationStock: ProductLocationStock = {
    productId: '123',
    locationId: 'MTL123',
    stock: 50
  }

  beforeEach(async () => {
    partsService = new PartsService(partsDocumentModel);
    partLogsService = new PartLogsService(partLogDocument);
    locationsService = new LocationsService(locationDocument);
    partLocationStockService = new PartLocationStockService(partLocationStockDocument, partsService, partLogsService, locationsService);

    productsService = new ProductsService(productDocument);
    productLogsService = new ProductLogsService(productLogDocument);
    locationsService = new LocationsService(locationDocument);
    productLocationStockService = new ProductLocationStockService(productLocationStockDocument, productsService, productLogsService, locationsService);
    productBuilderService = new ProductBuilderService(productsService, productLocationStockService, partLocationStockService);
    productsController = new ProductsController(productsService, productLocationStockService, productBuilderService);
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

  describe('build', () => {
    it('Should build a new a product from parts at a location', async () => {
      const result: any = {
        stockBuilt: 10,
        productId: dummyProductLocationStock.productId,
      };

      const newBuiltProduct = new BuildProductDto();
      newBuiltProduct.stockBuilt = result.stockBuilt;
      newBuiltProduct.productId = result.productId;
      const newBuiltProductList: BuildProductDto[] = [newBuiltProduct];

      jest
        .spyOn(productBuilderService, 'build')
        .mockImplementation(async () => await result);

      expect(await productsController.build(dummyProductLocationStock.locationId, newBuiltProductList)).toBe(result);
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

  describe('findAllLocationStock', () => {
    it('Should find all products location stock', async () => {
      const result: ProductLocationStock[] = [dummyProductLocationStock];

      jest
        .spyOn(productLocationStockService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await productsController.findAllLocationStock(dummyProductLocationStock.locationId)).toBe(result);
    });
  });

  describe('findOneLocationStock', () => {
    it('Should find one product\'s location stock', async () => {
      const result: ProductLocationStock = dummyProductLocationStock;

      jest
        .spyOn(productLocationStockService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await productsController.findOneLocationStock(dummyProductLocationStock.productId, dummyProductLocationStock.locationId)).toBe(result);
    });
  });

  describe('updateStock', () => {
    it('Should update the stock of a product at a location', async () => {
      const result: ProductLocationStock = dummyProductLocationStock;

      const updatedProductStock = new UpdateProductStockDto();
      updatedProductStock.stockBuilt = 10;
      updatedProductStock.stockUsed = 20;

      jest
        .spyOn(productLocationStockService, 'update')
        .mockImplementation(async () => await result);

      expect(await productsController.updateStock(dummyProductLocationStock.productId, dummyProductLocationStock.locationId, updatedProductStock)).toBe(result);
    });
  });
});
