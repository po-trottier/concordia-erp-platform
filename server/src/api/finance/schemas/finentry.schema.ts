import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FinentryDocument = Finentry & Document;

/**
 * Finentry collection mongoose schema
 */
@Schema()
export class Finentry {

  @Prop({ required: true })
  dateEntered: Date;

  @Prop({ required: true })
  dateDue: Date;

  @Prop({ required: true })
  company_name: string;

  @Prop({ required: true, default: 0 })
  amount: number;

  @Prop({ required: false, default: 0 })
  paid: number;
}

export const FinentrySchema = SchemaFactory.createForClass(Finentry);
