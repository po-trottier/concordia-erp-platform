import { ProductsController } from '../../../src/api/products/products.controller';
import { ProductsService } from '../../../src/api/products/products.service';
import { CreateProductDto } from '../../../src/api/products/dto/create-product.dto';
import { UpdateProductDto } from '../../../src/api/products/dto/update-product.dto';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../../../src/api/products/schemas/products.schema';

describe('PartsController', () => {
  
  let productsController: ProductsController;
  let productsService: ProductsService;
  let partsDocumentModel: Model<ProductDocument>;

  const dummyProduct: Product = {
    name: 'Canondale Bike',
    price: 1000,
    quantity: 20,
    parts: [],
    properties: [],
  }

  beforeEach(async () => {
    productsService = new ProductsService(partsDocumentModel);
    productsController = new ProductsController(productsService);
  });

  describe('findAll', () => {
    it('Should return a list of all parts', async () => {
      const result: Product[] = [
        dummyProduct,
    ];
      jest.spyOn(productsService, 'findAll').mockImplementation(async () => await result);

      expect(await productsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a from by its username', async () => {
      const result: Product = dummyProduct;

      jest.spyOn(productsService, 'findOne').mockImplementation(async () => await result)

      expect(await productsController.findOne(result.name)).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a new part', async () => {
      const result: Product = dummyProduct;

      const newProduct = new CreateProductDto();
      newProduct.name = result.name;
      newProduct.price = result.price;
      newProduct.quantity = result.quantity;
      newProduct.properties = result.properties;
      newProduct.parts = result.parts;

      jest.spyOn(productsService, 'create').mockImplementation(async () => await result);

      expect(await productsController.create(newProduct)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should remove a part by its name', async () => {
      const result: Product = dummyProduct
    
      jest.spyOn(productsService, 'remove').mockImplementation(async () => await result);
    
      expect(await productsController.remove(result.name)).toBe(result);
    });
  });

  describe('update', () => {
    it('Should update user attribute values', async () => {
      const result: Product = dummyProduct;

      const updatedProduct = new UpdateProductDto();
      updatedProduct.name = result.name;
      updatedProduct.price = result.price;
      updatedProduct.quantity = result.quantity;
      updatedProduct.properties = result.properties;
      updatedProduct.parts = result.parts;
      
      jest.spyOn(productsService, 'update').mockImplementation(async () => await result)

      expect(await productsController.update(result.name, updatedProduct)).toBe(result);
    });
  });
});
