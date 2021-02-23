import { Get, Controller } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { ProductLogsService } from './product-logs.service';

@Controller('/logs')
export class ProductLogsController {
  constructor(private readonly productsLogService: ProductLogsService) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.productsLogService.findAll();
  }
}
