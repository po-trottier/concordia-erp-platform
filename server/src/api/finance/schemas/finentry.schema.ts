import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FinentryDocument = Finentry & Document;

/**
 * Finentry collection mongoose schema
 */
@Schema()
export class Finentry {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: 0 })
  stock: number;
}

export const FinentrySchema = SchemaFactory.createForClass(Finentry);
