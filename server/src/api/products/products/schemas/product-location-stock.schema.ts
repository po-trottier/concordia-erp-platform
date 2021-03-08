import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type ProductLocationStockDocument = ProductLocationStock & Document;

/**
 * ProductLocationStock collection mongoose schema
 */
@Schema()
export class ProductLocationStock {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true,
  })
  productId: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Location',
    required: true,
    index: true,
  })
  locationId: string;

  @Prop({ required: true, default: 0 })
  stock: number;
}

export const ProductLocationStockSchema = SchemaFactory.createForClass(
  ProductLocationStock,
);
ProductLocationStockSchema.index(
  { productId: 1, locationId: 1 },
  { unique: true },
);
