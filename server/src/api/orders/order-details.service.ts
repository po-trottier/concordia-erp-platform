import { Injectable } from '@nestjs/common';
import { MaterialOrdersService } from './material-orders.service';
import { ProductOrdersService } from './product-orders.service';
import { SummaryDto } from './dto/summary.dto';
import { ProductOrder } from './schemas/product-orders.schema';
import { MaterialOrder } from './schemas/material-orders.schema';

@Injectable()
export class OrderDetailsService {
  async getBalance(
    productOrderService: ProductOrdersService,
    materialOrderService: MaterialOrdersService,
  ) {
    const productOrders: ProductOrder[] = await productOrderService.findAll();
    const materialOrders: MaterialOrder[] = await materialOrderService.findAll();

    let balance = 0;
    productOrders.forEach((p: ProductOrder) => {
      if (p.isPaid) {
        balance += p.amountDue;
      }
    });

    materialOrders.forEach((m: MaterialOrder) => {
      if (m.isPaid) {
        balance -= m.amountDue;
      }
    });

    return { balance: balance };
  }

  async getSummary(
    productOrderService: ProductOrdersService,
    materialOrderService: MaterialOrdersService,
  ) {
    const productOrders: ProductOrder[] = await productOrderService.findAll();
    const materialOrders: MaterialOrder[] = await materialOrderService.findAll();

    const dateMap = new Map<string, number>();

    productOrders.forEach((p: ProductOrder) => {
      const dateOrdered: string = p.dateOrdered.toISOString().split('T')[0];
      let currentValue: number = dateMap.get(dateOrdered);
      if (currentValue == null) {
        currentValue = 0;
      }
      dateMap.set(dateOrdered, currentValue + p.amountDue);
    });

    materialOrders.forEach((m: MaterialOrder) => {
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

    summaries.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return summaries;
  }
}
