import {
  Body,
  Headers,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CustomersService } from './customers.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateCustomerDto } from './dto/create-customer.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Roles(Role.SALESPERSON, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Body(ValidationPipe) CreateCustomerDto: CreateCustomerDto) {
    return this.customersService.create(CreateCustomerDto);
  }

  @Roles(Role.ANY)
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Roles(Role.ANY)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Roles(Role.SALESPERSON, Role.SYSTEM_ADMINISTRATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) UpdateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, UpdateCustomerDto);
  }

  @Roles(Role.SALESPERSON, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
