import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MaterialOrderDocument = MaterialOrder & Document;

/**
 * Order collection mongoose schema
 */
@Schema()
export class MaterialOrder {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Material',
    required: true,
    index: true,
  })
  materialId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  amountDue: number;

  @Prop({ required: true })
  dateOrdered: Date;

  @Prop({ required: true })
  dateDue: Date;

  @Prop({ required: true })
  isPaid = false;
}

export const MaterialOrderSchema = SchemaFactory.createForClass(MaterialOrder);
