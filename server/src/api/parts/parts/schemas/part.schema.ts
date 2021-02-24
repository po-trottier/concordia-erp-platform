import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PartDocument = Part & Document;

/**
 * Part collection mongoose schema
 */
@Schema()
export class Part {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: 0 })
  stock: number;
}

export const PartSchema = SchemaFactory.createForClass(Part);
