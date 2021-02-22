import {
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Controller,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';

@Controller()
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Body(ValidationPipe) createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePartDto: UpdatePartDto,
  ) {
    return this.partsService.update(id, updatePartDto);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partsService.remove(id);
  }
}