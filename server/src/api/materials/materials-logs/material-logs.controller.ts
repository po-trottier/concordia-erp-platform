import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { MaterialLogsService } from './material-logs.service';

@Controller('/logs')
export class MaterialLogsController {
  constructor(private readonly materialLogsService: MaterialLogsService) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':id/:date')
  findOne(@Param('id') id: string, @Param('date') date: Date) {
    return this.materialLogsService.findOne(id, date);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.materialLogsService.findAll();
  }
}
