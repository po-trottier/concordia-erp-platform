import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type MaterialStockDocument = MaterialStock & Document;

/**
 * MaterialStock collection mongoose schema
 */
@Schema()
export class MaterialStock {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Material',
    required: true,
    index: true,
  })
  materialId: string;

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

export const MaterialStockSchema = SchemaFactory.createForClass(MaterialStock);
MaterialStockSchema.index({ materialId: 1, locationId: 1 }, { unique: true });