import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { PartLogsService } from './part-logs.service';

@Controller('/logs')
export class PartLogsController {
  constructor(private readonly partLogsService: PartLogsService) {}

  @Roles(Role.ANY)
  @Get(':locationId/:partId')
  findOne(
    @Param('partId') partId: string,
    @Param('locationId') locationId: string,
  ) {
    return this.partLogsService.findOne(partId, locationId);
  }

  @Roles(Role.ANY)
  @Get(':locationId')
  findAll(@Param('locationId') locationId: string) {
    return this.partLogsService.findAll(locationId);
  }
}
