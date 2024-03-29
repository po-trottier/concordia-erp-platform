import { OrdersController } from '../../../src/api/orders/orders.controller';
import { MaterialOrdersService } from '../../../src/api/orders/material-orders.service';
import { ProductOrdersService } from '../../../src/api/orders/product-orders.service';
import { OrderDetailsService } from '../../../src/api/orders/order-details.service';
import { ProductsService } from '../../../src/api/products/products/products.service';
import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { CreateProductOrderDto } from '../../../src/api/orders/dto/create-product-order.dto';
import { UpdateProductOrderDto } from '../../../src/api/orders/dto/update-product-order.dto';
import { CreateMaterialOrderDto } from '../../../src/api/orders/dto/create-material-order.dto';
import { UpdateMaterialOrderDto } from '../../../src/api/orders/dto/update-material-order.dto';
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
import { MaterialStockService } from '../../../src/api/materials/materials/material-stock.service';
import { MaterialStockDocument } from '../../../src/api/materials/materials/schemas/material-stock.schema';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import { ProductStockService } from '../../../src/api/products/products/product-stock.service';
import { ProductStockDocument } from '../../../src/api/products/products/schemas/product-stock.schema';
import { ProductLogsService } from '../../../src/api/products/products-logs/product-logs.service';
import { ProductLogDocument } from '../../../src/api/products/products-logs/schemas/product-log.schema';
import { LocationsService } from '../../../src/api/locations/locations.service';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';
import { PartLogDocument } from '../../../src/api/parts/parts-logs/schemas/part-log.schema';
import { PartStockDocument } from 'src/api/parts/parts/schemas/part-stock.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PartDocument } from 'src/api/parts/parts/schemas/part.schema';
import { JwtService } from '@nestjs/jwt';

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
  let productDocument: Model<ProductDocument>;
  let partDocument: Model<PartDocument>;

  let materialStockService: MaterialStockService;
  let materialStockDocument: Model<MaterialStockDocument>;
  let materialLogsService: MaterialLogsService;
  let materialLogDocument: Model<MaterialLogDocument>;
  let productStockService: ProductStockService;
  let productStockDocument: Model<ProductStockDocument>;
  let productLogsService: ProductLogsService;
  let productLogDocument: Model<ProductLogDocument>;

  let locationsService: LocationsService;
  let locationDocument: Model<LocationDocument>;

  let partLogDocument: Model<PartLogDocument>;
  let partStockDocument: Model<PartStockDocument>;
  let emitter: EventEmitter2;
  let jwtService: JwtService;

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

  const auth : string = 'auth123';

  beforeEach(async () => {
    locationsService = new LocationsService(
      jwtService,
      emitter,
      locationDocument,
      materialStockDocument,
      partStockDocument,
      productStockDocument,
      materialLogDocument,
      partLogDocument,
      productLogDocument
    );
    materialService = new MaterialsService(
      jwtService,
      emitter,
      partDocument,
      materialDocumentModel,
      materialLogDocument,
      materialStockDocument
    );
    materialLogsService = new MaterialLogsService(materialLogDocument);
    materialStockService = new MaterialStockService(
      materialStockDocument,
      materialService,
      materialLogsService,
      locationsService
    );
    materialOrdersService = new MaterialOrdersService(
      jwtService,
      emitter,
      materialOrderDocument,
      materialService,
      materialStockService
    );
    productsService = new ProductsService(
      jwtService,
      emitter,
      productDocument,
      productLogDocument,
      productStockDocument
    );
    productLogsService = new ProductLogsService(productLogDocument);
    productLogsService = new ProductLogsService(productLogDocument);
    productStockService = new ProductStockService(productStockDocument, productsService, productLogsService, locationsService);
    productOrdersService = new ProductOrdersService(
      jwtService,
      emitter,
      productOrderDocument,
      productsService,
      productStockService
    );
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
      newMaterialOrder = {
        ...dummyMaterialOrder,
        locationId: 'MTL123'
      }
      newMaterialOrderList = [newMaterialOrder];

      jest
        .spyOn(materialOrdersService, 'createMaterialOrder')
        .mockImplementation(async () => await result);

      expect(
        await ordersController.createMaterialOrder(auth, newMaterialOrderList),
      ).toBe(result);
    });
  });

  describe('updateMaterialOrder', () => {
    it('Should update an existing materials order.', async () => {
      const result: MaterialOrder = dummyMaterialOrder;

      let newMaterialOrder = new UpdateMaterialOrderDto();
      newMaterialOrder = {
        ...dummyMaterialOrder,
        locationId: 'MTL123'
      }

      jest
        .spyOn(materialOrdersService, 'update')
        .mockImplementation(async () => await result);

      expect(
        await ordersController.updateMaterialOrder(
          dummyMaterialOrder.materialId,
          newMaterialOrder,
        ),
      ).toBe(result);
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
      newMaterialOrder = {
        ...dummyMaterialOrder,
        locationId: 'MTL123'
      }

      jest
        .spyOn(materialOrdersService, 'findOne')
        .mockImplementation(async () => await result);

      expect(
        await ordersController.findOneMaterialOrder(
          newMaterialOrder.materialId,
        ),
      ).toBe(result);
    });
  });

  describe('removeMaterialOrder', () => {
    it('Should delete one material order by id.', async () => {
      const result: MaterialOrder = dummyMaterialOrder;
      let newMaterialOrder = new CreateMaterialOrderDto();
      newMaterialOrder = {
        ...dummyMaterialOrder,
        locationId: 'MTL123'
      }

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
      newProductOrder = {
        ...dummyProductOrder,
        locationId: 'MTL123'
      };
      newProductOrderList = [newProductOrder];

      jest
        .spyOn(productOrdersService, 'create')
        .mockImplementation(async () => await result);

      expect(
        await ordersController.createProductOrder(auth, newProductOrderList),
      ).toBe(result);
    });
  });

  describe('updateProductOrder', () => {
    it('Should update an existing products order.', async () => {
      const result: ProductOrder = dummyProductOrder;

      let newProductOrder = new UpdateProductOrderDto();
      newProductOrder = {
        ...dummyProductOrder,
        locationId: 'MTL123'
      };

      jest
        .spyOn(productOrdersService, 'update')
        .mockImplementation(async () => await result);

      expect(
        await ordersController.updateProductOrder(
          dummyMaterialOrder.materialId,
          newProductOrder,
        ),
      ).toBe(result);
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
      newProductOrder = {
        ...dummyProductOrder,
        locationId: 'MTL123'
      };

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
      newProductOrder = {
        ...dummyProductOrder,
        locationId: 'MTL123'
      };

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
