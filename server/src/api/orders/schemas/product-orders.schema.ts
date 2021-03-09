import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductOrderDocument = ProductOrder & Document;

/**
 * Order collection mongoose schema
 */
@Schema()
export class ProductOrder {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  amountDue: number;

  @Prop({ required: true })
  dateOrdered: Date;

  @Prop({ required: true })
  dateDue: Date;
}

export const ProductOrderSchema = SchemaFactory.createForClass(ProductOrder);
