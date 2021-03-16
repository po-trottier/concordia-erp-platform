import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { MaterialLogsService } from './material-logs.service';

@Controller('/logs')
export class MaterialLogsController {
  constructor(private readonly materialLogsService: MaterialLogsService) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':locationId/:materialId')
  findOne(
    @Param('materialId') materialId: string,
    @Param('locationId') locationId: string,
  ) {
    return this.materialLogsService.findOne(materialId, locationId);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':locationId')
  findAll(@Param('locationId') locationId: string) {
    return this.materialLogsService.findAll(locationId);
  }
}
