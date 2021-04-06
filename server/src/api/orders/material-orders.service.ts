import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { isSameDay } from 'date-fns';
import { Model } from 'mongoose';
import {
  MaterialOrder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MaterialOrderDocument,
} from './schemas/material-orders.schema';
import { CreateMaterialOrderDto } from './dto/create-material-order.dto';
import { UpdateMaterialOrderDto } from './dto/update-material-order.dto';
import { MaterialsService } from '../materials/materials/materials.service';
import { UpdateMaterialStockDto } from '../materials/materials/dto/update-material-stock.dto';
import { MaterialStockService } from '../materials/materials/material-stock.service';
import { EventMap } from '../../events/common';

@Injectable()
export class MaterialOrdersService {
  constructor(
    @InjectModel(MaterialOrder.name)
    private materialOrderModel: Model<MaterialOrderDocument>,
    private readonly materialsService: MaterialsService,
    private readonly materialStockService: MaterialStockService,
    private emitter: EventEmitter2,
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
    const stockUpdateDtoMap = new Map<string, UpdateMaterialStockDto[]>();

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

      const dto: UpdateMaterialStockDto = {
        materialId: materialOrder.materialId,
        stockUsed: 0,
        stockBought: materialOrder.quantity,
      };

      //add dto to the location, dto[] map
      if (stockUpdateDtoMap.has(materialOrder.locationId)) {
        stockUpdateDtoMap.get(materialOrder.locationId).push(dto);
      } else {
        stockUpdateDtoMap.set(materialOrder.locationId, [dto]);
      }
    }

    //iterate over location, dto[] map and update stocks
    for (const [location, dtoArray] of stockUpdateDtoMap) {
      await this.materialStockService.update(location, dtoArray);
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

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handleAccountsPayablePayments() {
    const materialOrders: any[] = await this.findAll();
    const unpaidOrders = materialOrders.filter(
      (order) => order.isPaid === false,
    );

    for (const order of unpaidOrders) {
      if (isSameDay(new Date(order.dateDue), new Date())) {
        const paidOrder = await this.materialOrderModel.findByIdAndUpdate(
          order._id,
          { $set: { isPaid: true } },
          { new: true },
        );

        this.emitter.emit(EventMap.ACCOUNT_PAYABLE_PAID.id, paidOrder);
      }
    }
  }
}
