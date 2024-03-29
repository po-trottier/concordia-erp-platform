import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { isSameDay, isAfter } from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import {
  ProductOrder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ProductOrderDocument,
} from './schemas/product-orders.schema';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { ProductsService } from '../products/products/products.service';
import { ProductStockService } from '../products/products/product-stock.service';
import { UpdateProductStockDto } from '../products/products/dto/update-product-stock.dto';
import { EventMap } from '../../events/common';
import { Mail } from '../../shared/mail';
import { CONTACT_EMAIL } from '../../shared/constants';
import { UserToken } from '../../shared/user-token.interface';

@Injectable()
export class ProductOrdersService {
  constructor(
    private jwtService: JwtService,
    private emitter: EventEmitter2,
    @InjectModel(ProductOrder.name)
    private productOrderModel: Model<ProductOrderDocument>,
    private readonly productsService: ProductsService,
    private readonly productStockService: ProductStockService,
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

  async create(
    auth: string,
    createProductOrderDto: CreateProductOrderDto[],
  ): Promise<ProductOrder[]> {
    const orders: ProductOrder[] = [];
    const stockUpdateDtoMap = new Map<string, UpdateProductStockDto[]>();

    // verifying that product stocks are enough
    for (const productOrder of createProductOrderDto) {
      const productStock: any = await this.productStockService.findOne(
        productOrder.productId,
        productOrder.locationId,
      );

      if (productStock.stock < productOrder.quantity) {
        throw new BadRequestException(
          'There are not enough Product:' +
            productStock.productId +
            ' to complete the order.',
        );
      }
    }

    // completing orders
    for (const productOrder of createProductOrderDto) {
      const order: any = productOrder;
      const product = await this.productsService.findOne(order.productId);
      const dateOrdered = new Date(order.dateOrdered);
      order.amountDue = order.quantity * product.price;
      order.dateDue = new Date(order.dateOrdered).setDate(
        dateOrdered.getDate() + this.getIncrement(dateOrdered.getDay()),
      );

      const createdOrder = new this.productOrderModel(order);
      orders.push(await createdOrder.save());

      const dto: UpdateProductStockDto = {
        productId: productOrder.productId,
        stockUsed: productOrder.quantity,
        stockBuilt: 0,
      };

      //add dto to the location, dto[] map
      if (stockUpdateDtoMap.has(productOrder.locationId)) {
        stockUpdateDtoMap.get(productOrder.locationId).push(dto);
      } else {
        stockUpdateDtoMap.set(productOrder.locationId, [dto]);
      }
    }

    //iterate over location, dto[] map and update stocks
    for (const [location, dtoArray] of stockUpdateDtoMap) {
      await this.productStockService.update(location, dtoArray);
    }

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token: UserToken = decoded;

    this.emitter.emit(EventMap.PRODUCT_SOLD.id, { orders, token });
    return orders;
  }

  async findAll(): Promise<ProductOrder[]> {
    return await this.productOrderModel
      .find()
      .populate('productId')
      .populate('customerId')
      .exec();
  }

  async findOne(id: string): Promise<ProductOrder> {
    const order = await this.productOrderModel
      .findById(id)
      .populate('productId')
      .populate('customerId')
      .exec();
    return this.checkOrderFound(order, id);
  }

  async remove(id: string): Promise<ProductOrder> {
    const deletedOrder = await this.productOrderModel.findByIdAndDelete(id);
    return this.checkOrderFound(deletedOrder, id);
  }

  async update(
    id: string,
    updateProductOrderDto: UpdateProductOrderDto,
  ): Promise<ProductOrder> {
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

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handlePayments() {
    const unpaidOrders: any[] = await this.productOrderModel
      .find({ isPaid: false })
      .populate('customerId')
      .populate('productId')
      .exec();

    const paidOrders: Map<string, ProductOrderDocument[]> = new Map();

    for (const order of unpaidOrders) {
      if (
        isSameDay(new Date(), new Date(order.dateDue)) ||
        isAfter(new Date(), new Date(order.dateDue))
      ) {
        await this.productOrderModel.findByIdAndUpdate(
          order._id,
          { $set: { isPaid: true } },
          { new: true },
        );
        // Group the Orders by Customer Email
        if (paidOrders.has(order.customerId.email)) {
          paidOrders.set(
            order.customerId.email,
            paidOrders.get(order.customerId.email).concat(order),
          );
        } else {
          paidOrders.set(order.customerId.email, [order]);
        }
      }
    }

    for (const [email, orders] of paidOrders.entries()) {
      await Mail.instance.send({
        to: email,
        from: CONTACT_EMAIL,
        subject: '[EPIC Resource Planner] Order Billing Confirmation',
        html: ProductOrdersService.getEmailHtml(orders),
      });

      this.emitter.emit(EventMap.ACCOUNT_RECEIVABLE_PAID.id, { email, orders });
    }
  }

  private static getEmailHtml(orders: any[]) {
    let total = 0;
    let html = `<p>Dear customer,</p><p>Your recent order has been billed. The details of your order are as follows:</p>`;

    orders.forEach((order) => {
      if (!order.productId) {
        return;
      }
      total += order.amountDue;
      html += `<ul>
        <li>Product ID: ${order.productId.id}</li>
        <li>Product Name: ${order.productId.name}</li>
        <li>Quantity: ${order.quantity}</li>
        <li>Amount Due: ${order.amountDue}$</li>
        <li>Date Ordered: ${order.dateOrdered.toLocaleDateString('en-US')}</li>
      </ul>`;
    });

    html += `<p><b>Total Due: ${total}$</b></p>`;

    return html;
  }
}
