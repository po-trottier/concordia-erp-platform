import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { ProductLogsService } from './product-logs.service';

@Controller('/logs')
export class ProductLogsController {
  constructor(private readonly productLogsService: ProductLogsService) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':id/:date')
  findOne(@Param('id') id: string, @Param('date') date: Date) {
    return this.productLogsService.findOne(id, date);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.productLogsService.findAll();
  }
}
