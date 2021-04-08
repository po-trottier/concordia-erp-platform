import {
  Body,
  Headers,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(
    @Headers('authorization') auth: string,
    @Body(ValidationPipe) createLocationDto: CreateLocationDto,
  ) {
    return this.locationsService.create(auth, createLocationDto);
  }

  @Roles(Role.ANY)
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Roles(Role.ANY)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Patch(':id')
  update(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body(ValidationPipe) updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(auth, id, updateLocationDto);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Headers('authorization') auth: string, @Param('id') id: string) {
    return this.locationsService.remove(auth, id);
  }
}
