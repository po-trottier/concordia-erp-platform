import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { ProductLogsService } from './product-logs.service';

@Controller('/logs')
export class ProductLogsController {
  constructor(private readonly productLogsService: ProductLogsService) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':locationId/:productId')
  findOne(
    @Param('locationId') locationId: string,
    @Param('productId') productId: string,
  ) {
    return this.productLogsService.findOne(locationId, productId);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':locationId')
  findAll(@Param('locationId') locationId: string) {
    return this.productLogsService.findAll(locationId);
  }
}
