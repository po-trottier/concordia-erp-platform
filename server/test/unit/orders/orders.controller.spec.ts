import { OrdersController } from '../../../src/api/orders/orders.controller';
import { MaterialOrdersService } from '../../../src/api/orders/material-orders.service';
import { ProductOrdersService } from '../../../src/api/orders/product-orders.service';
import { OrderDetailsService } from '../../../src/api/orders/order-details.service';
import { MaterialsService } from '../../../src/api/materials/materials/materials.service';
import { CreateProductOrderListDto } from '../../../src/api/orders/dto/create-product-order-list.dto';
import { CreateProductOrderDto } from '../../../src/api/orders/dto/create-product-order.dto';
import { CreateMaterialOrderDto } from '../../../src/api/orders/dto/create-material-order.dto';
import { CreateMaterialOrderListDto } from '../../../src/api/orders/dto/create-material-order-list.dto';
import { MaterialLogsService } from '../../../src/api/materials/materials-logs/material-logs.service';
import { MaterialLogDocument } from '../../../src/api/materials/materials-logs/schemas/material-log.schema';
import {
  MaterialOrder,
  MaterialOrderDocument,
} from '../../../src/api/orders/schemas/material-orders.schema';
import {
  ProductOrder,
  ProductOrderDocument,
} from '../../../src/api/orders/schemas/product-orders.schema';
import {
  MaterialDocument,
} from '../../../src/api/materials/materials/schemas/material.schema';
import { Model } from 'mongoose';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let materialOrdersService: MaterialOrdersService;
  let productOrdersService: ProductOrdersService;
  let orderDetailsService: OrderDetailsService;
  let materialService: MaterialsService;
  let materialLogsService: MaterialLogsService;
	let productOrderDocument: Model<ProductOrderDocument>;
	let materialOrderDocument: Model<MaterialOrderDocument>;
  let materialLogDocument: Model<MaterialLogDocument>;
  let materialDocumentModel: Model<MaterialDocument>;

	const dummyMaterialOrder: MaterialOrder = {
		amountDue: 5000,
		dateDue: new Date,
		dateOrdered: new Date,
		quantity: 100,
		isPaid: false,
		materialId: '1234'
	};

	const dummyProductOrder: ProductOrder = {
		customerId: '5678',
		productId: 'abcd',
		quantity: 10,
		amountDue: 60,
		dateDue: new Date,
		dateOrdered: new Date,
		isPaid: false
	}

  beforeEach(async () => {
    materialLogsService = new MaterialLogsService(materialLogDocument);
    materialService = new MaterialsService(
      materialDocumentModel,
      materialLogsService,
    );
		materialOrdersService = new MaterialOrdersService(materialOrderDocument);
		productOrdersService = new ProductOrdersService(productOrderDocument);
    ordersController = new OrdersController(materialOrdersService, productOrdersService, materialService, orderDetailsService);
  });

	describe('createMaterial', () => {
    it('Should create a new materials order.', async () => {
      const result: MaterialOrder[] = [dummyMaterialOrder];

			let newMaterialOrder = new CreateMaterialOrderDto();
      let newMaterialOrderList : any = new CreateMaterialOrderListDto();
			newMaterialOrder = dummyMaterialOrder;
			newMaterialOrderList = [newMaterialOrder];

      jest
        .spyOn(materialOrdersService, 'createMaterialOrder')
        .mockImplementation(async () => await result);

      expect(await ordersController.createMaterial(newMaterialOrderList)).toBe(result);
    });
  });

	describe('findOneMaterial', () => {
    it('Should find one material order by id.', async () => {
      const result: MaterialOrder = dummyMaterialOrder;
			let newMaterialOrder = new CreateMaterialOrderDto();
			newMaterialOrder = dummyMaterialOrder;

      jest
        .spyOn(materialOrdersService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await ordersController.findOneMaterial(newMaterialOrder.materialId)).toBe(result);
    });
  });

	describe('removeMaterial', () => {
    it('Should delete one material order by id.', async () => {
      const result: MaterialOrder = dummyMaterialOrder;
			let newMaterialOrder = new CreateMaterialOrderDto();
			newMaterialOrder = dummyMaterialOrder;

      jest
        .spyOn(materialOrdersService, 'remove')
        .mockImplementation(async () => await result);

      expect(await ordersController.removeMaterial(newMaterialOrder.materialId)).toBe(result);
    });
  });

	describe('createProduct', () => {
    it('Should create a new product order.', async () => {
      const result: ProductOrder[] = [dummyProductOrder];

			let newProductOrder = new CreateProductOrderDto();
      let newProductOrderList : any = new CreateProductOrderListDto();
			newProductOrder = dummyProductOrder;
			newProductOrderList = [newProductOrder];

      jest
        .spyOn(productOrdersService, 'createProductOrder')
        .mockImplementation(async () => await result);

      expect(await ordersController.createProduct(newProductOrderList)).toBe(result);
    });
  });

	describe('findAllProducts', () => {
    it('Should find one product order by id.', async () => {
      const result: ProductOrder[] = [dummyProductOrder];

      jest
        .spyOn(productOrdersService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await ordersController.findAllProducts()).toBe(result);
    });
  });

	describe('findOneProduct', () => {
    it('Should find one product order by id.', async () => {
      const result: ProductOrder = dummyProductOrder;
			let newProductOrder = new CreateProductOrderDto();
			newProductOrder = dummyProductOrder;

      jest
        .spyOn(productOrdersService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await ordersController.findOneProduct(newProductOrder.customerId)).toBe(result);
    });
  });

	describe('removeProduct', () => {
    it('Should delete one product order by id.', async () => {
      const result: ProductOrder = dummyProductOrder;
			let newProductOrder = new CreateProductOrderDto();
			newProductOrder = dummyProductOrder;

      jest
        .spyOn(productOrdersService, 'remove')
        .mockImplementation(async () => await result);

      expect(await ordersController.removeProduct(newProductOrder.customerId)).toBe(result);
    });
  });
});
