import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

export interface ProductPartInterface {
  partId: string;
  quantity: number;
}

export interface ProductPropertyInterface {
  key: string;
  value: string;
}

/**
 * Product collection mongoose schema
 */
@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  parts: ProductPartInterface[];

  @Prop()
  properties: ProductPropertyInterface[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
