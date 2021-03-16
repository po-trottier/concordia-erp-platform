import { OrdersController } from '../../../src/api/orders/orders.controller';
import { MaterialOrdersService } from '../../../src/api/orders/material-orders.service';
import { ProductOrdersService } from '../../../src/api/orders/product-orders.service';
import { OrderDetailsService } from '../../../src/api/orders/order-details.service';
import { ProductsService } from '../../../src/api/products/products/products.service';
import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { CreateProductOrderDto } from '../../../src/api/orders/dto/create-product-order.dto';
import { CreateMaterialOrderDto } from '../../../src/api/orders/dto/create-material-order.dto';
import {
  MaterialOrder,
  MaterialOrderDocument,
} from '../../../src/api/orders/schemas/material-orders.schema';
import {
  ProductOrder,
  ProductOrderDocument,
} from '../../../src/api/orders/schemas/product-orders.schema';
import { MaterialDocument } from '../../../src/api/materials/materials/schemas/material.schema';
import { ProductDocument } from '../../../src/api/products/products/schemas/products.schema';
import { Model } from 'mongoose';
import { SummaryDto } from 'src/api/orders/dto/summary.dto';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let materialOrdersService: MaterialOrdersService;
  let productOrdersService: ProductOrdersService;
  let orderDetailsService: OrderDetailsService;
  let materialService: MaterialsService;
  let productsService: ProductsService;
  let productOrderDocument: Model<ProductOrderDocument>;
  let materialOrderDocument: Model<MaterialOrderDocument>;
  let materialDocumentModel: Model<MaterialDocument>;
  let productDocument: Model<ProductDocument>

  const dummyMaterialOrder: MaterialOrder = {
    amountDue: 5000,
    dateDue: new Date(),
    dateOrdered: new Date(),
    quantity: 100,
    isPaid: false,
    materialId: '1234',
  };

  const dummyProductOrder: ProductOrder = {
    customerId: '5678',
    productId: 'abcd',
    quantity: 10,
    amountDue: 60,
    dateDue: new Date(),
    dateOrdered: new Date(),
    isPaid: false,
  };

  beforeEach(async () => {
    materialService = new MaterialsService(materialDocumentModel);
    materialOrdersService = new MaterialOrdersService(materialOrderDocument, materialService);
    productsService = new ProductsService(productDocument);
    productOrdersService = new ProductOrdersService(productOrderDocument, productsService);
    orderDetailsService = new OrderDetailsService();
    ordersController = new OrdersController(
      materialOrdersService,
      productOrdersService,
      orderDetailsService,
    );
  });

  describe('createMaterialOrder', () => {
    it('Should create a new materials order.', async () => {
      const result: MaterialOrder[] = [dummyMaterialOrder];

      let newMaterialOrder = new CreateMaterialOrderDto();
      let newMaterialOrderList: CreateMaterialOrderDto[] = [];
      newMaterialOrder = dummyMaterialOrder;
      newMaterialOrderList = [newMaterialOrder];

      jest
        .spyOn(materialOrdersService, 'createMaterialOrder')
        .mockImplementation(async () => await result);

      expect(await ordersController.createMaterialOrder(newMaterialOrderList)).toBe(
        result,
      );
    });
  });

  describe('findAllMaterialsOrder', () => {
    it('Should find all material orders with supplier.', async () => {
      const result: MaterialOrder[] = [
        {
          amountDue: 5000,
          dateDue: new Date(),
          dateOrdered: new Date(),
          quantity: 100,
          isPaid: false,
          materialId: '1234',
        },
      ];

      jest
        .spyOn(materialOrdersService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await ordersController.findAllMaterialsOrder()).toBe(result);
    });
  });

  describe('findOneMaterialOrder', () => {
    it('Should find one material order by id.', async () => {
      const result: MaterialOrder = dummyMaterialOrder;
      let newMaterialOrder = new CreateMaterialOrderDto();
      newMaterialOrder = dummyMaterialOrder;

      jest
        .spyOn(materialOrdersService, 'findOne')
        .mockImplementation(async () => await result);

      expect(
        await ordersController.findOneMaterialOrder(newMaterialOrder.materialId),
      ).toBe(result);
    });
  });

  describe('removeMaterialOrder', () => {
    it('Should delete one material order by id.', async () => {
      const result: MaterialOrder = dummyMaterialOrder;
      let newMaterialOrder = new CreateMaterialOrderDto();
      newMaterialOrder = dummyMaterialOrder;

      jest
        .spyOn(materialOrdersService, 'remove')
        .mockImplementation(async () => await result);

      expect(
        await ordersController.removeMaterialOrder(newMaterialOrder.materialId),
      ).toBe(result);
    });
  });

  describe('createProductOrder', () => {
    it('Should create a new product order.', async () => {
      const result: ProductOrder[] = [dummyProductOrder];

      let newProductOrder = new CreateProductOrderDto();
      let newProductOrderList: CreateProductOrderDto[] = [];
      newProductOrder = dummyProductOrder;
      newProductOrderList = [newProductOrder];

      jest
        .spyOn(productOrdersService, 'create')
        .mockImplementation(async () => await result);

      expect(await ordersController.createProductOrder(newProductOrderList)).toBe(
        result,
      );
    });
  });

  describe('findAllProductsOrder', () => {
    it('Should find all product orders.', async () => {
      const result: ProductOrder[] = [dummyProductOrder];

      jest
        .spyOn(productOrdersService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await ordersController.findAllProductsOrder()).toBe(result);
    });
  });

  describe('findOneProductOrder', () => {
    it('Should find one product order by id.', async () => {
      const result: ProductOrder = dummyProductOrder;
      let newProductOrder = new CreateProductOrderDto();
      newProductOrder = dummyProductOrder;

      jest
        .spyOn(productOrdersService, 'findOne')
        .mockImplementation(async () => await result);

      expect(
        await ordersController.findOneProductOrder(newProductOrder.customerId),
      ).toBe(result);
    });
  });

  describe('removeProductOrder', () => {
    it('Should delete one product order by id.', async () => {
      const result: ProductOrder = dummyProductOrder;
      let newProductOrder = new CreateProductOrderDto();
      newProductOrder = dummyProductOrder;

      jest
        .spyOn(productOrdersService, 'remove')
        .mockImplementation(async () => await result);

      expect(
        await ordersController.removeProductOrder(newProductOrder.customerId),
      ).toBe(result);
    });
  });

  describe('balance', () => {
    it('Should get the balance.', async () => {
      const result = {
        balance: 50000,
      };

      jest
        .spyOn(orderDetailsService, 'getBalance')
        .mockImplementation(async () => await result);

      expect(await ordersController.balance()).toBe(result);
    });
  });

  describe('summary', () => {
    it('Should get the balance.', async () => {
      const result: SummaryDto[] = [
        {
          date: 'Today',
          balance: 1000000,
        },
      ];

      jest
        .spyOn(orderDetailsService, 'getSummary')
        .mockImplementation(async () => await result);

      expect(await ordersController.summary()).toBe(result);
    });
  });
});
