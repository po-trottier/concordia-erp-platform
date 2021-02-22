import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MaterialDocument = Material & Document;

/**
 * Material collection mongoose schema
 */
@Schema()
export class Material {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop({ required: true, default: 1 })
  density: number;

  @Prop({ required: true, default: 1 })
  vendorName: string;

  @Prop({ required: true, default: 1 })
  price: number;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
