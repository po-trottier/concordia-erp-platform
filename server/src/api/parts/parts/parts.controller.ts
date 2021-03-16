import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { UpdatePartStockDto } from './dto/update-part-stock.dto';
import { PartLocationStockService } from './part-location-stock.service';

@Controller()
export class PartsController {
  constructor(
    private readonly partsService: PartsService,
    private readonly partLocationStockService: PartLocationStockService,
  ) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Body(ValidationPipe) createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.partsService.findAll();
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

  // STOCK ENDPOINTS

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get('stock/:locationId')
  findAllLocationStock(@Param('locationId') locationId: string) {
    return this.partLocationStockService.findAll(locationId);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get('stock/:locationId/:partId')
  findOneLocationStock(
    @Param('partId') partId: string,
    @Param('locationId') locationId: string,
  ) {
    return this.partLocationStockService.findOne(partId, locationId);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch('stock/:locationId/:partId')
  updateStock(
    @Param('partId') partId: string,
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) updatePartStockDto: UpdatePartStockDto,
  ) {
    return this.partLocationStockService.update(
      partId,
      locationId,
      updatePartStockDto,
    );
  }
}
