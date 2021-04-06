import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Product } from './products.schema';
import { Location } from '../../../locations/schemas/location.schema';

export type ProductStockDocument = ProductStock & Document;

/**
 * ProductStock collection mongoose schema
 */
@Schema()
export class ProductStock {
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

  @Prop({ required: true, default: 0 })
  stock: number;
}

export const ProductStockSchema = SchemaFactory.createForClass(ProductStock);
ProductStockSchema.index({ productId: 1, locationId: 1 }, { unique: true });
