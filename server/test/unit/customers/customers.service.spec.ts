import { CustomersService } from '../../../src/api/customers/customers.service';
import { CustomerDocument } from '../../../src/api/customers/schemas/customers.schema';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('CustomersService', () => {
  let customersService: CustomersService;
  let customerDocument: Model<CustomerDocument>;
  let emitter: EventEmitter2;

  beforeEach(() => {
    customersService = new CustomersService(emitter, customerDocument);
  });

  it('should be defined', () => {
    expect(customersService).toBeDefined();
  });
});
