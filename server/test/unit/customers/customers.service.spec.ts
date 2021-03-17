import { CustomersService } from '../../../src/api/customers/customers.service';
import { CustomerDocument } from '../../../src/api/customers/schemas/customers.schema';
import { Model } from 'mongoose';

describe('CustomersService', () => {
  let customersService: CustomersService;
  let customerDocument: Model<CustomerDocument>;

  beforeEach(() => {
    customersService = new CustomersService(customerDocument);
  });

  it('should be defined', () => {
    expect(customersService).toBeDefined();
  });
});