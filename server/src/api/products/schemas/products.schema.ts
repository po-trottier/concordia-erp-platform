import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  ProductProperty,
} from './product-property.schema';
import { ProductPart } from './product-part.schema';

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

  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop([{ type: Types.ObjectId, ref: ProductPart.name }])
  parts: ProductPart[];

  @Prop([{ type: Types.ObjectId, ref: ProductProperty.name }])
  properties: ProductProperty[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
