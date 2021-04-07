import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Part } from './part.schema';
import { Location } from '../../../locations/schemas/location.schema';

export type PartStockDocument = PartStock & Document;

/**
 * PartStock collection mongoose schema
 */
@Schema()
export class PartStock {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Part.name,
    required: true,
    index: true,
  })
  partId: string;

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

export const PartStockSchema = SchemaFactory.createForClass(PartStock);
PartStockSchema.index({ partId: 1, locationId: 1 }, { unique: true });
