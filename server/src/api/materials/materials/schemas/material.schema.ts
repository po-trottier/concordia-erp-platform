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

  @Prop({ required: true, default: 1 })
  density: number;

  @Prop({ required: true })
  vendorName: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, default: 1 })
  price: number;

  @Prop({ required: true, default: 0 })
  quantity: number;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
