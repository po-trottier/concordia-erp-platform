import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FinanceEntryDocument = FinanceEntry & Document;

/**
 * FinanceEntry collection mongoose schema
 */
@Schema()
export class FinanceEntry {
  @Prop({ required: true })
  dateEntered: Date;

  @Prop({ required: true })
  dateDue: Date;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true, default: 0 })
  amount: number;

  @Prop({ required: false, default: 0 })
  paid: number;
}

export const FinanceEntrySchema = SchemaFactory.createForClass(FinanceEntry);
