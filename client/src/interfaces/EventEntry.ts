import { CustomerEntry } from './CustomerEntry';
import { UserEntry } from './UserEntry';
import { Role } from '../router/Roles';

export interface EventEntry {
  _id : string,
  eventId : string,
  customerId : CustomerEntry[],
  userId :UserEntry[],
  role? : Role[],
}
