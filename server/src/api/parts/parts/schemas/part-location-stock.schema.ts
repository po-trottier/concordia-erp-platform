import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type PartLocationStockDocument = PartLocationStock & Document;

/**
 * PartLocationStock collection mongoose schema
 */
@Schema()
export class PartLocationStock {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Part',
    required: true,
    index: true,
  })
  partId: string;

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

export const PartLocationStockSchema = SchemaFactory.createForClass(
  PartLocationStock,
);
PartLocationStockSchema.index({ partId: 1, locationId: 1 }, { unique: true });
