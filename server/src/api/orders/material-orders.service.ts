import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MaterialOrder,
  MaterialOrderDocument,
} from './schemas/material-orders.schema';
import { CreateMaterialOrderDto } from './dto/create-material-order.dto';
import { CreateMaterialOrderListDto } from './dto/create-material-order-list.dto';

@Injectable()
export class MaterialOrdersService {
  constructor(
    @InjectModel(MaterialOrder.name)
    private materialOrderModel: Model<MaterialOrderDocument>,
  ) {}

  async createMaterialOrder(
    createMaterialOrderListDto: CreateMaterialOrderListDto,
  ): Promise<MaterialOrder[]> {
    const createdOrders: MaterialOrder[] = [];

    for (const materialOrder of createMaterialOrderListDto.orders) {
      const createdOrder = new this.materialOrderModel(materialOrder);
      createdOrders.push(await createdOrder.save());
    }
    return createdOrders;
  }

  async findMaterialOrders(): Promise<MaterialOrder[]> {
    return await this.materialOrderModel.find().exec();
  }

  async findAll(): Promise<MaterialOrder[]> {
    const materialOrders: CreateMaterialOrderDto[] = await this.materialOrderModel.find().populate('materialId').exec();
    return materialOrders;
  }

  async findOne(id: string): Promise<MaterialOrder> {
    const order = await this.materialOrderModel.findById(id).populate('materialId');
    return this.checkOrderFound(order, id);
  }

  async remove(id: string): Promise<MaterialOrder> {
    const deletedorder = await this.materialOrderModel.findByIdAndDelete(id);

    return this.checkOrderFound(deletedorder, id);
  }

  checkOrderFound(orderResult: any, id: string) {
    if (!orderResult) {
      throw new NotFoundException(`material order with id ${id} not found`);
    } else {
      return orderResult;
    }
  }
}
