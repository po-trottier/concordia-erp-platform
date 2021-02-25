import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type ProductLogDocument = ProductLog & Document;

/**
 * ProductLog collection mongoose schema
 */
@Schema()
export class ProductLog {
  @Prop({ required: true, index: true })
  date: Date;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true,
  })
  productId: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  stockBuilt: number;

  @Prop({ required: true })
  stockUsed: number;
}

export const ProductLogSchema = SchemaFactory.createForClass(ProductLog);
ProductLogSchema.index({ date: 1, productId: 1 }, { unique: true });
