import { CustomersController } from '../../../src/api/customers/customers.controller';
import { CustomersService } from '../../../src/api/customers/customers.service';
import { CreateCustomerDto } from '../../../src/api/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../../src/api/customers/dto/update-customer.dto';
import { Customer, CustomerDocument } from '../../../src/api/customers/schemas/customers.schema';
import { Model } from 'mongoose';

describe('CustomersController', () => {
  let customersController: CustomersController;
  let customersService: CustomersService;
  let customerDocument: Model<CustomerDocument>;

  const dummyCustomer: Customer = {
    name: 'Sports Expert',
    email: 'sportsexpert@sports.com'
  };

  beforeEach(() => {
    customersService = new CustomersService(customerDocument);
    customersController = new CustomersController(customersService);
  });

  describe('findAll', () => {
    it('Should return a list of all customers', async () => {
      const result: Customer[] = [dummyCustomer];
      jest
        .spyOn(customersService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await customersController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a customer by its id', async () => {
      const result: Customer = dummyCustomer;

      jest
        .spyOn(customersService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await customersController.findOne('123')).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a customer', async () => {
      const result: Customer = dummyCustomer;

      const newCustomer = new CreateCustomerDto();
      newCustomer.name = result.name;
      newCustomer.email = result.email

      jest
        .spyOn(customersService, 'create')
        .mockImplementation(async () => await result);

      expect(await customersController.create(newCustomer)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should delete a customer by its id', async () => {
      const result: Customer = dummyCustomer;

      jest
        .spyOn(customersService, 'remove')
        .mockImplementation(async () => await result);

      expect(await customersController.remove('123')).toBe(result);
    });
  });

  describe('update', () => {
    it('Should update customer\s attribute values by its id', async () => {
      const result: Customer = dummyCustomer;

      const newLocation = new UpdateCustomerDto();
      newLocation.name = result.name;
      
      jest
        .spyOn(customersService, 'update')
        .mockImplementation(async () => await result);

      expect(await customersController.update('123', newLocation)).toBe(
        result,
      );
    });
  });
});
