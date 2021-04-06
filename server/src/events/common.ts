import { Model } from 'mongoose';
import { EventDocument } from '../api/events/schemas/events.schema';
import { UserDocument } from '../api/users/schemas/user.schema';

export enum EventID {
  PRODUCT_BUILT = 'ckn5l26dp00018s58eo4vaca6',
  PRODUCT_CREATED = 'ckn5l286b00028s58ns2izgbs',
  PRODUCT_DELETED = 'ckn5l2a1d00038s5845hr2l8g',
  PRODUCT_MODIFIED = 'ckn5l2c2t00048s58066gvg0i',
  PRODUCT_SOLD = 'ckn5l2e7f00058s58i0951s59',
  PART_BUILT = 'ckn5l2fv700068s589r8dri6m',
  PART_CREATED = 'ckn5l2hru00078s58up2xj0q5',
  PART_DELETED = 'ckn5l2jm900088s58degslox6',
  PART_MODIFIED = 'ckn5l2lcf00098s58xcuhbsw9',
  MATERIAL_CREATED = 'ckn5l2n94000a8s582yzubonu',
  MATERIAL_DELETED = 'ckn5l2oyn000b8s58efdlop8q',
  MATERIAL_MODIFIED = 'ckn5l2qoz000c8s58eydvbgdq',
  MATERIAL_ORDERED = 'ckn5l2sfc000d8s588zpki9w8',
  CUSTOMER_CREATED = 'ckn5l2u39000e8s58mleavpdz',
  CUSTOMER_DELETED = 'ckn5l2vzz000f8s58urvyqssm',
  CUSTOMER_MODIFIED = 'ckn5l2y5i000g8s58skemnpha',
  USER_CREATED = 'ckn5l30au000h8s58lycm3s08',
  USER_DELETED = 'ckn5l32ci000i8s58c17plm37',
  USER_MODIFIED = 'ckn5l346q000j8s58zbhn7otx',
  EVENT_CREATED = 'ckn5l3qa2000k8s583sscivgp',
  EVENT_DELETED = 'ckn5l3swb000l8s58gqxxt35d',
  EVENT_MODIFIED = 'ckn5l3uk6000m8s58ncov03sv',
  LOCATION_CREATED = 'ckn5l5w1n000p8s58ocbwkidj',
  LOCATION_DELETED = 'ckn5l5yaz000q8s58ybtzl6qw',
  LOCATION_MODIFIED = 'ckn5l603m000r8s58kiejuu7z',
  AUDIT_GENERATED = 'ckn5l4jm5000n8s58nlq3jvjh',
  LOGS_CLEARED = 'ckn5l4xkn000o8s58zprfwjn7',
  ACCOUNT_PAYABLE_PAID = 'ckn5n2tds000s8s588l2rgr07',
  ACCOUNT_RECEIVABLE_PAID = 'ckn5n2xle000t8s58u8nabgj8',
}

export const EventsMap = [
  { name: 'Product Built', id: 'ckn5l26dp00018s58eo4vaca6' },
  { name: 'Product Created', id: 'ckn5l286b00028s58ns2izgbs' },
  { name: 'Product Deleted', id: 'ckn5l2a1d00038s5845hr2l8g' },
  { name: 'Product Modified', id: 'ckn5l2c2t00048s58066gvg0i' },
  { name: 'Product Sold', id: 'ckn5l2e7f00058s58i0951s59' },
  { name: 'Part Built', id: 'ckn5l2fv700068s589r8dri6m' },
  { name: 'Part Created', id: 'ckn5l2hru00078s58up2xj0q5' },
  { name: 'Part Deleted', id: 'ckn5l2jm900088s58degslox6' },
  { name: 'Part Modified', id: 'ckn5l2lcf00098s58xcuhbsw9' },
  { name: 'Material Created', id: 'ckn5l2n94000a8s582yzubonu' },
  { name: 'Material Deleted', id: 'ckn5l2oyn000b8s58efdlop8q' },
  { name: 'Material Modified', id: 'ckn5l2qoz000c8s58eydvbgdq' },
  { name: 'Material Ordered', id: 'ckn5l2sfc000d8s588zpki9w8' },
  { name: 'Customer Created', id: 'ckn5l2u39000e8s58mleavpdz' },
  { name: 'Customer Deleted', id: 'ckn5l2vzz000f8s58urvyqssm' },
  { name: 'Customer Modified', id: 'ckn5l2y5i000g8s58skemnpha' },
  { name: 'User Created', id: 'ckn5l30au000h8s58lycm3s08' },
  { name: 'User Deleted', id: 'ckn5l32ci000i8s58c17plm37' },
  { name: 'User Modified', id: 'ckn5l346q000j8s58zbhn7otx' },
  { name: 'Event Created', id: 'ckn5l3qa2000k8s583sscivgp' },
  { name: 'Event Deleted', id: 'ckn5l3swb000l8s58gqxxt35d' },
  { name: 'Event Modified', id: 'ckn5l3uk6000m8s58ncov03sv' },
  { name: 'Location Created', id: 'ckn5l5w1n000p8s58ocbwkidj' },
  { name: 'Location Deleted', id: 'ckn5l5yaz000q8s58ybtzl6qw' },
  { name: 'Location Modified', id: 'ckn5l603m000r8s58kiejuu7z' },
  { name: 'Audit Generated', id: 'ckn5l4jm5000n8s58nlq3jvjh' },
  { name: 'Logs Cleared', id: 'ckn5l4xkn000o8s58zprfwjn7' },
  { name: 'Account Payable Paid', id: 'ckn5n2tds000s8s588l2rgr07' },
  { name: 'Account Receivable Paid', id: 'ckn5n2xle000t8s58u8nabgj8' },
];

export const getEmails = async (
  eventId: EventID,
  events: Model<EventDocument>,
  users: Model<UserDocument>,
) => {
  const listeners = await events
    .find({
      eventId: eventId,
    })
    .populate('customerId')
    .populate('userId')
    .exec();

  const emails = [];
  for (const listener of listeners) {
    if (listener.userId && listener.userId.length > 0) {
      // Get emails for users
      listener.userId.forEach((u: any) => {
        emails.push(u.email);
      });
    } else if (listener.customerId && listener.customerId.length > 0) {
      // Get emails for customers
      listener.customerId.forEach((c: any) => {
        emails.push(c.email);
      });
    } else if (listener.role && listener.role.length > 0) {
      // Get emails for an entire role type
      for (const role of listener.role) {
        const filtered = await users.find({
          role,
        });
        filtered.forEach((u) => {
          emails.push(u.email);
        });
      }
    }
  }

  return emails;
};
