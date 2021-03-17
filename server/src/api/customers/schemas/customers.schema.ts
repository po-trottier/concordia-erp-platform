import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

/**
 * Part collection mongoose schema
 */
@Schema()
export class Customer {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
