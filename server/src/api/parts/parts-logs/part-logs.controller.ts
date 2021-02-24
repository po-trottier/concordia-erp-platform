import { Get, Controller } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { PartLogsService } from './part-logs.service';

@Controller('/logs')
export class PartLogsController {
  constructor(private readonly partsLogService: PartLogsService) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.partsLogService.findAll();
  }
}
