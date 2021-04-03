import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProductOrder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ProductOrderDocument,
} from './schemas/product-orders.schema';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { ProductsService } from '../products/products/products.service';
import { ProductStockService } from '../products/products/product-stock.service';
import { UpdateProductStockDto } from '../products/products/dto/update-product-stock.dto';

@Injectable()
export class ProductOrdersService {
  constructor(
    @InjectModel(ProductOrder.name)
    private productOrderModel: Model<ProductOrderDocument>,
    private readonly productsService: ProductsService,
    private readonly productStockService: ProductStockService,
  ) {}

  getIncrement(day: number) {
    switch (day) {
      case 0:
        return 5;
      case 1:
        return 4;
      case 2:
        return 3;
      case 3:
        return 2;
      case 4:
        return 8;
      case 5:
        return 7;
      case 6:
        return 6;
      default:
        return 7;
    }
  }

  async create(
    createProductOrderDto: CreateProductOrderDto[],
  ): Promise<ProductOrder[]> {
    const createdOrders: ProductOrder[] = [];
    const stockUpdateDtoMap = new Map<string, UpdateProductStockDto[]>();

    // verifying that product stocks are enough
    for (const productOrder of createProductOrderDto) {
      const productStock: any = await this.productStockService.findOne(
        productOrder.productId,
        productOrder.locationId,
      );

      if (productStock.stock < productOrder.quantity) {
        throw new BadRequestException(
          'There are not enough Product:' +
            productStock.productId +
            ' to complete the order.',
        );
      }
    }

    // completing orders
    for (const productOrder of createProductOrderDto) {
      const order: any = productOrder;
      const product = await this.productsService.findOne(order.productId);
      const dateOrdered = new Date(order.dateOrdered);
      order.amountDue = order.quantity * product.price;
      order.dateDue = new Date(order.dateOrdered).setDate(
        dateOrdered.getDate() + this.getIncrement(dateOrdered.getDay()),
      );

      const createdOrder = new this.productOrderModel(order);
      createdOrders.push(await createdOrder.save());

      const dto: UpdateProductStockDto = {
        productId: productOrder.productId,
        stockUsed: productOrder.quantity,
        stockBuilt: 0,
      };

      //add dto to the location, dto[] map
      if (stockUpdateDtoMap.has(productOrder.locationId)) {
        stockUpdateDtoMap.get(productOrder.locationId).push(dto);
      } else {
        stockUpdateDtoMap.set(productOrder.locationId, [dto]);
      }
    }

    //iterate over location, dto[] map and update stocks
    for (const [location, dtoArray] of stockUpdateDtoMap) {
      await this.productStockService.update(location, dtoArray);
    }

    return createdOrders;
  }

  async findAll(): Promise<ProductOrder[]> {
    return await this.productOrderModel
      .find()
      .populate('productId')
      .populate('customerId')
      .exec();
  }

  async findOne(id: string): Promise<ProductOrder> {
    const order = await this.productOrderModel
      .findById(id)
      .populate('productId')
      .populate('customerId')
      .exec();
    return this.checkOrderFound(order, id);
  }

  async remove(id: string): Promise<ProductOrder> {
    const deletedOrder = await this.productOrderModel.findByIdAndDelete(id);
    return this.checkOrderFound(deletedOrder, id);
  }

  async update(
    id: string,
    updateProductOrderDto: UpdateProductOrderDto,
  ): Promise<ProductOrder> {
    const updatedProductOrder = await this.productOrderModel.findByIdAndUpdate(
      id,
      { $set: { ...updateProductOrderDto } },
      { new: true },
    );

    return this.checkOrderFound(updatedProductOrder, id);
  }

  checkOrderFound(orderResult: any, id: string) {
    if (!orderResult) {
      throw new NotFoundException(`Product order with id ${id} not found`);
    } else {
      return orderResult;
    }
  }
}
