import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuditActions } from '../enums/audit-actions.enum';

export type AuditDocument = Audit & Document;

/**
 * Part collection mongoose schema
 */
@Schema()
export class Audit {
  @Prop({ required: true })
  module: string;

  @Prop({ required: true, enum: AuditActions })
  action: string;

  @Prop({ required: true, index: true })
  date: Date;

  @Prop({ required: true })
  target: string;

  @Prop({ required: true })
  author: string;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
