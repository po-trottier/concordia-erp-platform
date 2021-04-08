import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuditsService } from './audits.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { QueryAuditDto } from './dto/query-audit.dto';

@Controller()
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.auditsService.findAll();
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get('filter')
  find(@Query() query: QueryAuditDto) {
    return this.auditsService.find(query);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditsService.findOne(id);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get('modules')
  findModules() {
    return this.auditsService.findModules();
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Delete()
  clear() {
    return this.auditsService.clear();
  }
}
