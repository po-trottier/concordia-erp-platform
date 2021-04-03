import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller()
export class CustomersController {
  constructor(private readonly CustomersService: CustomersService) {}

  @Roles(Role.SALESPERSON, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Body(ValidationPipe) CreateCustomerDto: CreateCustomerDto) {
    return this.CustomersService.create(CreateCustomerDto);
  }

  @Roles(Role.ANY)
  @Get()
  findAll() {
    return this.CustomersService.findAll();
  }

  @Roles(Role.ANY)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CustomersService.findOne(id);
  }

  @Roles(Role.SALESPERSON, Role.SYSTEM_ADMINISTRATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) UpdateCustomerDto: UpdateCustomerDto,
  ) {
    return this.CustomersService.update(id, UpdateCustomerDto);
  }

  @Roles(Role.SALESPERSON, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CustomersService.remove(id);
  }
}
