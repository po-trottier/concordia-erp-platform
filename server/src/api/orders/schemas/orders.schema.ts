import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FinanceEntry } from '../../finance/schemas/finance.schema';

export type OrderDocument = Order & Document;
export interface MaterialInterface {
  materialId: string;
  quantity: number;
}

export interface ProductInterface {
  productId: string;
  quantity: number;
}
/**
 * Order collection mongoose schema
 */
@Schema()
export class Order {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  merchandise: MaterialInterface[] | ProductInterface[];

  @Prop({ required: true })
  payment: FinanceEntry;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
