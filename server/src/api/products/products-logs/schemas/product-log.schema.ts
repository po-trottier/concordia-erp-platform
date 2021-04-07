import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Product } from '../../products/schemas/products.schema';
import { Location } from '../../../locations/schemas/location.schema';

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
    ref: Product.name,
    required: true,
    index: true,
  })
  productId: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Location.name,
    required: true,
    index: true,
  })
  locationId: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  stockBuilt: number;

  @Prop({ required: true })
  stockUsed: number;
}

export const ProductLogSchema = SchemaFactory.createForClass(ProductLog);
ProductLogSchema.index(
  { date: 1, productId: 1, locationId: 1 },
  { unique: true },
);
