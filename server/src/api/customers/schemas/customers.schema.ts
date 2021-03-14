import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type customerDocument = Customer & Document;

/**
 * Part collection mongoose schema
 */
@Schema()
export class Customer {
  @Prop({ required: true, unique: true })
  company: string;

  @Prop({ required: true })
  sold: string;

  @Prop({ required: true, unique: true })
  paid: string;

  @Prop({ required: true })
  balance: string;
}

export const customerSchema = SchemaFactory.createForClass(Customer);
