import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProductOrder,
  ProductOrderDocument,
} from './schemas/product-orders.schema';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { ProductsService } from '../products/products/products.service';

@Injectable()
export class ProductOrdersService {
  constructor(
    @InjectModel(ProductOrder.name)
    private productOrderModel: Model<ProductOrderDocument>,
    private readonly productsService: ProductsService,
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
