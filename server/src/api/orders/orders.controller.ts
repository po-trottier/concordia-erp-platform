import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { MaterialOrdersService } from './material-orders.service';
import { CreateMaterialOrderListDto } from './dto/create-material-order-list.dto';
import { ProductOrdersService } from './product-orders.service';
import { CreateProductOrderListDto } from './dto/create-product-order-list.dto';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { CreateMaterialOrderDto } from './dto/create-material-order.dto';
import { SummaryDto } from './dto/summary.dto';
import { MaterialsService } from '../materials/materials/materials.service';
import { MaterialWithSupplierDto } from './dto/material-with-supplier.dto';

/**
 * Controller class of the Order entity
 */
@Controller()
export class OrdersController {
  constructor(
    private readonly materialOrderService: MaterialOrdersService,
    private readonly productOrderService: ProductOrdersService,
    private readonly materialsService: MaterialsService,
  ) {}

  @Post('materials')
  createMaterial(
    @Body(ValidationPipe)
    createMaterialOrderListDto: CreateMaterialOrderListDto,
  ) {
    return this.materialOrderService.createMaterialOrder(
      createMaterialOrderListDto,
    );
  }

  @Get('materials/all')
  async findAllMaterials() {
    const materialOrders: CreateMaterialOrderDto[] = await this.materialOrderService.findAll();
    const materialOrdersWithSupplier: MaterialWithSupplierDto[] = [];
    for (const materialOrder of materialOrders) {
      materialOrdersWithSupplier.push({
        amountDue: materialOrder.amountDue,
        dateDue: materialOrder.dateDue,
        dateOrdered: materialOrder.dateOrdered,
        isPaid: materialOrder.isPaid,
        quantity: materialOrder.quantity,
        supplierName: (
          await this.materialsService.findOne(materialOrder.materialId)
        ).vendorName,
        materialId: materialOrder.materialId,
      });
    }

    return materialOrdersWithSupplier;
  }

  @Get('materials/:id')
  findOneMaterial(@Param('id') id: string) {
    return this.materialOrderService.findOne(id);
  }

  @Delete('materials/:id')
  removeMaterial(@Param('id') id: string) {
    return this.materialOrderService.remove(id);
  }

  @Post('products')
  createProduct(
    @Body(ValidationPipe) createProductOrderListDto: CreateProductOrderListDto,
  ) {
    return this.productOrderService.createProductOrder(
      createProductOrderListDto,
    );
  }

  @Get('products/all')
  findAllProducts() {
    return this.productOrderService.findAll();
  }

  @Get('products/:id')
  findOneProduct(@Param('id') id: string) {
    return this.productOrderService.findOne(id);
  }

  @Delete('products/:id')
  removeProduct(@Param('id') id: string) {
    return this.productOrderService.remove(id);
  }

  @Get('balance')
  async balance() {
    const productOrders: CreateProductOrderDto[] = await this.productOrderService.findAll();
    const materialOrders: CreateMaterialOrderDto[] = await this.materialOrderService.findAll();

    let balance = 0;
    productOrders.forEach((p: CreateProductOrderDto) => {
      if (p.isPaid) {
        balance += p.amountDue;
      }
    });

    materialOrders.forEach((m: CreateMaterialOrderDto) => {
      if (m.isPaid) {
        balance -= m.amountDue;
      }
    });

    return { balance: balance };
  }

  @Get('summary')
  async summary() {
    const productOrders: CreateProductOrderDto[] = await this.productOrderService.findAll();
    const materialOrders: CreateMaterialOrderDto[] = await this.materialOrderService.findAll();

    const dateMap = new Map<string, number>();

    productOrders.forEach((p) => {
      const dateOrdered: string = p.dateOrdered.toISOString().split('T')[0];
      let currentValue: number = dateMap.get(dateOrdered);
      if (currentValue == null) {
        currentValue = 0;
      }
      dateMap.set(dateOrdered, currentValue + p.amountDue);
    });

    materialOrders.forEach((m: CreateMaterialOrderDto) => {
      const dateOrdered: string = m.dateOrdered.toISOString().split('T')[0];
      let currentValue: number = dateMap.get(dateOrdered);
      if (currentValue == null) {
        currentValue = 0;
      }
      dateMap.set(dateOrdered, currentValue - m.amountDue);
    });

    const summaries: SummaryDto[] = [];
    dateMap.forEach((value: number, key: string) => {
      summaries.push({ date: key, balance: value });
    });

    summaries.sort(function (a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return summaries;
  }
}
