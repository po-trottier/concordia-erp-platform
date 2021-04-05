import { CustomerEntry } from './CustomerEntry';
import { UserEntry } from './UserEntry';

export interface EventEntry {
  _id : string,
  eventId : string,
  customerId : CustomerEntry[],
  userId :UserEntry[],
  role? : number,
}
