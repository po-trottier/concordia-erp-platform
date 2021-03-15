import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProductOrderDocument = ProductOrder & Document;

/**
 * Order collection mongoose schema
 */
@Schema()
export class ProductOrder {
  @Prop({ required: true })
  customerId: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true,
  })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  amountDue: number;

  @Prop({ required: true })
  dateOrdered: Date;

  @Prop({ required: true })
  dateDue: Date;

  @Prop({ required: true, default: false })
  isPaid: boolean;
}

export const ProductOrderSchema = SchemaFactory.createForClass(ProductOrder);