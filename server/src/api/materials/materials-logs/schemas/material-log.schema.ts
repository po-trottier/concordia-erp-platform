import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type MaterialLogDocument = MaterialLog & Document;

/**
 * MaterialLog collection mongoose schema
 */
@Schema()
export class MaterialLog {
  @Prop({ required: true, index: true })
  date: Date;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Material',
    required: true,
    index: true,
  })
  materialId: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  stockBought: number;

  @Prop({ required: true })
  stockUsed: number;
}

export const MaterialLogSchema = SchemaFactory.createForClass(MaterialLog);
MaterialLogSchema.index({ date: 1, materialId: 1 }, { unique: true });
