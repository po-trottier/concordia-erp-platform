import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProductOrder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ProductOrderDocument,
} from './schemas/product-orders.schema';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';

@Injectable()
export class ProductOrdersService {
  constructor(
    @InjectModel(ProductOrder.name)
    private productOrderModel: Model<ProductOrderDocument>,
  ) {}

  async create(
    createProductOrderDto: CreateProductOrderDto[],
  ): Promise<ProductOrder[]> {
    const createdOrders: ProductOrder[] = [];

    for (const productOrder of createProductOrderDto) {
      const createdOrder = new this.productOrderModel(productOrder);
      createdOrders.push(await createdOrder.save());
    }
    return createdOrders;
  }

  async findAll(): Promise<ProductOrder[]> {
    const productOrders: ProductOrder[] = await this.productOrderModel.find()
      .populate('productId')
      .exec();
    return productOrders;
  }

  async findOne(id: string): Promise<ProductOrder> {
    const order = await this.productOrderModel.findById(id).populate('productId');
    return this.checkOrderFound(order, id);
  }

  async remove(id: string): Promise<ProductOrder> {
    const deletedorder = await this.productOrderModel.findByIdAndDelete(id);

    return this.checkOrderFound(deletedorder, id);
  }

  async update(id:string, updateProductOrderDto: UpdateProductOrderDto): Promise<ProductOrder> {
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
