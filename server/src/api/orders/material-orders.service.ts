import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MaterialOrder,
  MaterialOrderDocument,
} from './schemas/material-orders.schema';
import { CreateMaterialOrderDto } from './dto/create-material-order.dto';
import { CreateMaterialOrderListDto } from './dto/create-material-order-list.dto';
import { MaterialWithSupplierDto } from './dto/material-with-supplier.dto';
import { MaterialsService } from '../materials/materials/materials.service';

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

  async findAll(materialService : MaterialsService): Promise<MaterialOrder[]> {
    const materialOrders: CreateMaterialOrderDto[] = await this.materialOrderModel.find().exec();

    const materialOrdersWithSupplier: MaterialWithSupplierDto[] = [];
    for (const materialOrder of materialOrders) {
      materialOrdersWithSupplier.push({
        amountDue: materialOrder.amountDue,
        dateDue: materialOrder.dateDue,
        dateOrdered: materialOrder.dateOrdered,
        isPaid: materialOrder.isPaid,
        quantity: materialOrder.quantity,
        supplierName: (
          await materialService.findOne(materialOrder.materialId)
        ).vendorName,
        materialId: materialOrder.materialId,
      });
    }
    return materialOrdersWithSupplier;
  }

  async findOne(id: string): Promise<MaterialOrder> {
    const order = await this.materialOrderModel.findById(id);

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
