import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Customer, CustomerDocument } from './schemas/customers.schema';

/**
 * Used by the CustomersController, handles customer data storage and retrieval.
 */
@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  /**
   * Creates customer using mongoose customerModel
   *
   * @param createCustomerDto dto used to create customers
   */
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return await createdCustomer.save();
  }

  /**
   * Retrieves all customers using mongoose customerModel
   */
  async findAll(): Promise<Customer[]> {
    return this.customerModel.find();
  }

  /**
   * Retrieves a customer by id using mongoose customerModel
   *
   * @param id string of the customer's objectId
   */
  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id);
    return this.validateCustomerFound(customer, id);
  }

  /**
   * Updates customer by id using mongoose customerModel
   *
   * @param id string of the customer's objectId
   * @param updateCustomerDto dto used to update customers
   */
  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      id,
      { $set: { ...updateCustomerDto } },
      { new: true },
    );
    return this.validateCustomerFound(updatedCustomer, id);
  }

  /**
   * Deletes customer by id using mongoose customerModel
   *
   * @param id string of the customer's objectId
   */
  async remove(id: string): Promise<Customer> {
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id);
    return this.validateCustomerFound(deletedCustomer, id);
  }

  /**
   * Returns NotFoundException if customer is null, otherwise returns customer
   *
   * @param customerResult a retrieved customer
   * @param id string of the customer's objectId
   */
  validateCustomerFound(customerResult: any, id: string) {
    if (!customerResult) {
      throw new NotFoundException(`customer with id ${id} not found`);
    } else {
      return customerResult;
    }
  }
}