import { CustomersService } from '../../../src/api/customers/customers.service';
import { CustomerDocument } from '../../../src/api/customers/schemas/customers.schema';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';

describe('CustomersService', () => {
  let customersService: CustomersService;
  let customerDocument: Model<CustomerDocument>;
  let emitter: EventEmitter2;
  let jwtService: JwtService;

  beforeEach(() => {
    customersService = new CustomersService(jwtService, emitter, customerDocument);
  });

  it('should be defined', () => {
    expect(customersService).toBeDefined();
  });
});
