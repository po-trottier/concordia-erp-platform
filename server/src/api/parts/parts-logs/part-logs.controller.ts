import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { PartLogsService } from './part-logs.service';

@Controller('/logs')
export class PartLogsController {
  constructor(private readonly partLogsService: PartLogsService) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':partId/:locationId/:date')
  findOne(
    @Param('partId') partId: string,
    @Param('locationId') locationId: string,
    @Param('date') date: Date,
  ) {
    return this.partLogsService.findOne(partId, locationId, date);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.partLogsService.findAll();
  }
}
