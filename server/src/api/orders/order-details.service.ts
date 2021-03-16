import { Injectable } from "@nestjs/common";
import { MaterialOrdersService } from './material-orders.service';
import { ProductOrdersService } from './product-orders.service';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { CreateMaterialOrderDto } from './dto/create-material-order.dto';
import { SummaryDto } from './dto/summary.dto';

@Injectable()
export class OrderDetailsService {

  async getBalance(productOrderService : ProductOrdersService, materialOrderService : MaterialOrdersService) {
    const productOrders: CreateProductOrderDto[] = await productOrderService.findAll();
    const materialOrders: CreateMaterialOrderDto[] = await materialOrderService.findAll();

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

  async getSummary(productOrderService : ProductOrdersService, materialOrderService : MaterialOrdersService) {
    const productOrders: CreateProductOrderDto[] = await productOrderService.findAll();
    const materialOrders: CreateMaterialOrderDto[] = await materialOrderService.findAll();

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
