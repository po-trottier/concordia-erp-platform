import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PartDocument = Part & Document;

export interface ProductMaterialInterface {
  materialId: string;
  quantity: number;
}
/**
 * Part collection mongoose schema
 */
@Schema()
export class Part {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop({ required: true, default: [] })
  materials: ProductMaterialInterface[];
}

export const PartSchema = SchemaFactory.createForClass(Part);
