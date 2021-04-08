import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Customer, CustomerDocument } from './schemas/customers.schema';
import { EventMap } from '../../events/common';
import {JwtService} from "@nestjs/jwt";
import {UserToken} from "../../shared/user-token.interface";

/**
 * Used by the CustomersController, handles customer data storage and retrieval.
 */
@Injectable()
export class CustomersService {
  constructor(
    private jwtService: JwtService,
    private emitter: EventEmitter2,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  /**
   * Creates customer using mongoose customerModel
   *
   * @param auth
   * @param createCustomerDto dto used to create customers
   */
  async create(auth: string, createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const customer = await createdCustomer.save();
    this.emitter.emit(EventMap.CUSTOMER_CREATED.id, {customer, token});
    return customer;
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
   * @param auth
   * @param id string of the customer's objectId
   * @param updateCustomerDto dto used to update customers
   */
  async update(
    auth: string,
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      id,
      { $set: { ...updateCustomerDto } },
      { new: true },
    );

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const customer = this.validateCustomerFound(updatedCustomer, id);
    this.emitter.emit(EventMap.CUSTOMER_MODIFIED.id, {customer, token});
    return customer;
  }

  /**
   * Deletes customer by id using mongoose customerModel
   *
   * @param auth
   * @param id string of the customer's objectId
   */
  async remove(auth: string, id: string): Promise<Customer> {
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id);

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const customer = this.validateCustomerFound(deletedCustomer, id);
    this.emitter.emit(EventMap.CUSTOMER_DELETED.id, {customer, token});
    return customer;
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
