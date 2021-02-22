import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type PartLogDocument = PartLog & Document;

/**
 * Part collection mongoose schema
 */
@Schema({ _id: false })
export class PartLog {
  @Prop({ required: true, index: true })
  date: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Part',
    required: true,
    index: true,
  })
  partId: string;

  @Prop({ required: true })
  stock: number;
}

export const PartLogSchema = SchemaFactory.createForClass(PartLog);
PartLogSchema.index({ date: 1, partId: 1 }, { unique: true });
