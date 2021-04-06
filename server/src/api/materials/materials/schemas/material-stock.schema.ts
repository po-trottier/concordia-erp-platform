import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Material } from './material.schema';
import { Location } from '../../../locations/schemas/location.schema';

export type MaterialStockDocument = MaterialStock & Document;

/**
 * MaterialStock collection mongoose schema
 */
@Schema()
export class MaterialStock {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Material.name,
    required: true,
    index: true,
  })
  materialId: string;

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

export const MaterialStockSchema = SchemaFactory.createForClass(MaterialStock);
MaterialStockSchema.index({ materialId: 1, locationId: 1 }, { unique: true });
