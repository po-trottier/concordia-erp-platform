import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/orders.schema';
import { CreateOrderDto } from './dto/create-order-entry.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

/**
 * Used by the ordersController, handles order data storage and retrieval.
 */
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  /**
   * Creates Order using mongoose OrderModel
   *
   * @param createOrderDto dto used to create Orders
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(CreateOrderDto);
    return createdOrder.save();
  }

  /**
   * Retrieves all Orders using mongoose OrderModel
   */
  async findAll(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }

  /**
   * Retrieves an order by id using mongoose OrderModel
   *
   * @param id string of the OrderModel's objectId
   */
  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);

    return this.checkOrderFound(order, id);
  }

  /**
   * Updates order by id using mongoose orderModel
   *
   * @param id string of the order's objectId
   * @param updateorderDto dto used to update orders
   */
  async update(id: string, updateorderDto: UpdateOrderDto): Promise<Order> {
    const updatedorder = await this.orderModel.findByIdAndUpdate(
      id,
      { $set: { ...updateorderDto } },
      { new: true },
    );

    return this.checkOrderFound(updatedorder, id);
  }

  /**
   * Deletes order by id using mongoose orderModel
   *
   * @param id string of the order's objectId
   */
  async remove(id: string): Promise<Order> {
    const deletedorder = await this.orderModel.findByIdAndDelete(id);

    return this.checkOrderFound(deletedorder, id);
  }

  /**
   * Returns NotFoundException if order is null, otherwise returns order
   *
   * @param orderResult a retrieved order
   * @param id string of the order's objectId
   */
  checkOrderFound(orderResult: any, id: string) {
    if (!orderResult) {
      throw new NotFoundException(`order with id ${id} not found`);
    } else {
      return orderResult;
    }
  }
}
