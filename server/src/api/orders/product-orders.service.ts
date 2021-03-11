import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductOrder, ProductOrderDocument } from './schemas/product-orders.schema';
import { CreateProductOrderListDto } from './dto/create-product-order-list.dto';

@Injectable()
export class ProductOrdersService {
  constructor(
    @InjectModel(ProductOrder.name)
    private ProductOrderModel: Model<ProductOrderDocument>,
  ) {}

  async createProductOrder(
    createProductOrderListDto: CreateProductOrderListDto,
  ): Promise<ProductOrder[]> {
    const createdOrders: ProductOrder[] = [];

    for (const ProductOrder of createProductOrderListDto.orders) {
      const createdOrder = new this.ProductOrderModel(ProductOrder);
      createdOrders.push(await createdOrder.save());
    }
    return createdOrders;
  }

  async findAll(): Promise<ProductOrder[]> {
    return await this.ProductOrderModel.find().exec();
  }

  async findOne(id: string): Promise<ProductOrder> {
    const order = await this.ProductOrderModel.findById(id);

    return this.checkOrderFound(order, id);
  }

  async remove(id: string): Promise<ProductOrder> {
    const deletedorder = await this.ProductOrderModel.findByIdAndDelete(id);

    return this.checkOrderFound(deletedorder, id);
  }

  checkOrderFound(orderResult: any, id: string) {
    if (!orderResult) {
      throw new NotFoundException(`Product order with id ${id} not found`);
    } else {
      return orderResult;
    }
  }
}
