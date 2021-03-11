import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

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

  @Prop({ required: true })
  isPaid = false;
}

export const ProductOrderSchema = SchemaFactory.createForClass(ProductOrder);
