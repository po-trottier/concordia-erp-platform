import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { ProductLogsService } from './product-logs.service';

@Controller('/logs')
export class ProductLogsController {
  constructor(private readonly productLogsService: ProductLogsService) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':productId/:locationId/:date')
  findOne(
    @Param('productId') productId: string,
    @Param('locationId') locationId: string,
    @Param('date') date: Date,
  ) {
    return this.productLogsService.findOne(productId, locationId, date);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.productLogsService.findAll();
  }
}
