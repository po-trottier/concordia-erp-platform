import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

/**
 * Part collection mongoose schema
 */
@Schema()
export class Customer {
  @Prop({ required: true, unique: true })
  company: string;

  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  sold: number;

  @Prop({ required: true, unique: true })
  paid: number;

  @Prop({ required: true })
  balance: number;
}

export const customerSchema = SchemaFactory.createForClass(Customer);
