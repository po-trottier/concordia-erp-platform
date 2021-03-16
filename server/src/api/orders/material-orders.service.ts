import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MaterialOrder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MaterialOrderDocument,
} from './schemas/material-orders.schema';
import { CreateMaterialOrderDto } from './dto/create-material-order.dto';
import { UpdateMaterialOrderDto } from './dto/update-material-order.dto';
import { MaterialsService } from '../materials/materials/materials.service';

@Injectable()
export class MaterialOrdersService {
  constructor(
    @InjectModel(MaterialOrder.name)
    private materialOrderModel: Model<MaterialOrderDocument>,
    private readonly materialsService: MaterialsService,
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

  async createMaterialOrder(
    createMaterialOrderDto: CreateMaterialOrderDto[],
  ): Promise<MaterialOrder[]> {
    const createdOrders: MaterialOrder[] = [];

    for (const materialOrder of createMaterialOrderDto) {
      const order: any = materialOrder;
      const material = await this.materialsService.findOne(order.materialId);
      const dateOrdered = new Date(order.dateOrdered);
      order.amountDue = order.quantity * material.price;
      order.dateDue = new Date(order.dateOrdered).setDate(
        dateOrdered.getDate() + this.getIncrement(dateOrdered.getDay()),
      );
      const createdOrder = new this.materialOrderModel(order);
      createdOrders.push(await createdOrder.save());
    }

    return createdOrders;
  }

  async findAll(): Promise<MaterialOrder[]> {
    return await this.materialOrderModel.find().populate('materialId').exec();
  }

  async findOne(id: string): Promise<MaterialOrder> {
    const order = await this.materialOrderModel
      .findById(id)
      .populate('materialId');
    return this.checkOrderFound(order, id);
  }

  async remove(id: string): Promise<MaterialOrder> {
    const deletedOrder = await this.materialOrderModel.findByIdAndDelete(id);
    return this.checkOrderFound(deletedOrder, id);
  }

  async update(
    id: string,
    updateMaterialOrderDto: UpdateMaterialOrderDto,
  ): Promise<MaterialOrder> {
    const updatedMaterialOrder = await this.materialOrderModel.findByIdAndUpdate(
      id,
      { $set: { ...updateMaterialOrderDto } },
      { new: true },
    );

    return this.checkOrderFound(updatedMaterialOrder, id);
  }

  checkOrderFound(orderResult: any, id: string) {
    if (!orderResult) {
      throw new NotFoundException(`material order with id ${id} not found`);
    } else {
      return orderResult;
    }
  }
}
