import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FinanceEntry } from '../../finance/schemas/finance.schema';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export type MaterialOrderDocument = MaterialOrder & Document;

/**
 * Order collection mongoose schema
 */
@Schema()
export class MaterialOrder {
  @Prop({ required: true })
  supplierName: string;

  @Prop({ required: true })
  materialId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  amountDue: number;

  @Prop({ required: true })
  dateOrdered: Date;

  @Prop({ required: true })
  dateDue: Date;
}

export const MaterialOrderSchema = SchemaFactory.createForClass(MaterialOrder);
