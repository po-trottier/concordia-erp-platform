import { ProductsController } from '../../../src/api/products/products/products.controller';
import { ProductsService } from '../../../src/api/products/products/products.service';
import { ProductStockService } from '../../../src/api/products/products/product-stock.service';
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
import { ProductStock } from '../../../src/api/products/products/schemas/product-stock.schema';
import { ProductStockDocument } from '../../../src/api/products/products/schemas/product-stock.schema';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';

import { PartsService } from '../../../src/api/parts/parts/parts.service';
import { PartLogsService } from '../../../src/api/parts/parts-logs/part-logs.service';
import { PartStockService } from '../../../src/api/parts/parts/part-stock.service';
import { PartDocument } from '../../../src/api/parts/parts/schemas/part.schema';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { PartStockDocument } from '../../../src/api/parts/parts/schemas/part-stock.schema';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let productDocument: Model<ProductDocument>;
  let productStockService: ProductStockService;
  let productLogsService: ProductLogsService;
  let productBuilderService: ProductBuilderService;
  let productStockDocument: Model<ProductStockDocument>;
  let productLogDocument: Model<ProductLogDocument>;
  let locationDocument: Model<LocationDocument>;
  let partsService: PartsService;
  let partLogsService: PartLogsService;
  let locationsService: LocationsService;
  let partStockService: PartStockService;
  let partLogDocument: Model<PartLogDocument>;
  let partsDocumentModel: Model<PartDocument>;
  let partStockDocument: Model<PartStockDocument>;

  const dummyProduct: Product = {
    name: 'Canondale Bike',
    price: 1000,
    parts: [],
    properties: [],
  };

  const dummyProductStock: ProductStock = {
    productId: '123',
    locationId: 'MTL123',
    stock: 50,
  };

  beforeEach(async () => {
    partsService = new PartsService(partsDocumentModel);
    partLogsService = new PartLogsService(partLogDocument);
    locationsService = new LocationsService(locationDocument);
    partStockService = new PartStockService(
      partStockDocument,
      partsService,
      partLogsService,
      locationsService,
    );
    productsService = new ProductsService(productDocument);
    productLogsService = new ProductLogsService(productLogDocument);
    locationsService = new LocationsService(locationDocument);
    productStockService = new ProductStockService(
      productStockDocument,
      productsService,
      productLogsService,
      locationsService,
    );
    productBuilderService = new ProductBuilderService(
      productsService,
      productStockService,
      partStockService,
    );
    productsController = new ProductsController(
      productsService,
      productStockService,
      productBuilderService,
    );
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
        productId: dummyProductStock.productId,
      };

      const newBuiltProduct = new BuildProductDto();
      newBuiltProduct.stockBuilt = result.stockBuilt;
      newBuiltProduct.productId = result.productId;
      const newBuiltProductList: BuildProductDto[] = [newBuiltProduct];

      jest
        .spyOn(productBuilderService, 'build')
        .mockImplementation(async () => await result);

      expect(
        await productsController.build(
          dummyProductStock.locationId,
          newBuiltProductList,
        ),
      ).toBe(result);
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

  describe('findAllStock', () => {
    it('Should find all products location stock', async () => {
      const result: ProductStock[] = [dummyProductStock];

      jest
        .spyOn(productStockService, 'findAll')
        .mockImplementation(async () => await result);

      expect(
        await productsController.findAllStock(dummyProductStock.locationId),
      ).toBe(result);
    });
  });

  describe('findOneStock', () => {
    it("Should find one product's location stock", async () => {
      const result: ProductStock = dummyProductStock;

      jest
        .spyOn(productStockService, 'findOne')
        .mockImplementation(async () => await result);

      expect(
        await productsController.findOneStock(
          dummyProductStock.productId,
          dummyProductStock.locationId,
        ),
      ).toBe(result);
    });
  });

  describe('updateStock', () => {
    it('Should update the stock of a product at a location', async () => {
      const result: ProductStock = dummyProductStock;

      const updatedProductStock = new UpdateProductStockDto();
      updatedProductStock.stockBuilt = 10;
      updatedProductStock.stockUsed = 20;

      jest
        .spyOn(productStockService, 'update')
        .mockImplementation(async () => await result);

      expect(
        await productsController.updateStock(
          dummyProductStock.locationId,
          [updatedProductStock]
        ),
      ).toBe(result);
    });
  });
});
