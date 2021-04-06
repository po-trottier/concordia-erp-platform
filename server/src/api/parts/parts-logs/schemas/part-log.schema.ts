import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Part } from '../../parts/schemas/part.schema';
import { Location } from '../../../locations/schemas/location.schema';

export type PartLogDocument = PartLog & Document;

/**
 * PartLog collection mongoose schema
 */
@Schema()
export class PartLog {
  @Prop({ required: true, index: true })
  date: Date;

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

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  stockBuilt: number;

  @Prop({ required: true })
  stockUsed: number;
}

export const PartLogSchema = SchemaFactory.createForClass(PartLog);
PartLogSchema.index({ date: 1, partId: 1, locationId: 1 }, { unique: true });
