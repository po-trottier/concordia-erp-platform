import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  // Will become a parts object
  @Prop({ required: true })
  parts: string[];

  @Prop({ required: true })
  frameSize: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  finish: string;

  @Prop({ required: true })
  grade: string;

  @Prop({ required: true })
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
