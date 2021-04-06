import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Customer } from '../../customers/schemas/customers.schema';
import { User } from '../../users/schemas/user.schema';
import { Role } from '../../roles/roles.enum';

export type EventDocument = Event & Document;

/**
 * Part collection mongoose schema
 */
@Schema()
export class Event {
  @Prop({ required: true })
  eventId: string;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: Customer.name }] })
  customerId: string[];

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: User.name }] })
  userId: string[];

  @Prop({ type: [Number], enum: Role })
  role: number[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
