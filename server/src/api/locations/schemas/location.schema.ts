import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

/**
 * Location collection mongoose schema
 */
@Schema()
export class Location {
  @Prop({ required: true, unique: true })
  name: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
