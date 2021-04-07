import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Customer } from '../../customers/schemas/customers.schema';
import { Product } from '../../products/products/schemas/products.schema';

export type ProductOrderDocument = ProductOrder & Document;

/**
 * Order collection mongoose schema
 */
@Schema()
export class ProductOrder {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Customer.name,
    required: true,
    index: true,
  })
  customerId: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Product.name,
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
