import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuditsService } from './audits.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateAuditDto } from './dto/create-audit.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller()
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Roles(Role.SALESPERSON, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Body(ValidationPipe) CreateAuditDto: CreateAuditDto) {
    return this.auditsService.create(CreateAuditDto);
  }

  @Roles(Role.ANY)
  @Get()
  findAll() {
    return this.auditsService.findAll();
  }

  @Roles(Role.ANY)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditsService.findOne(id);
  }

  @Roles(Role.SALESPERSON, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditsService.remove(id);
  }
}
