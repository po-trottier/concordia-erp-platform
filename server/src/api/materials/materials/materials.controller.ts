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
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { UpdateMaterialStockDto } from './dto/update-material-stock.dto';
import { MaterialLocationStockService } from './material-location-stock.service';

@Controller()
export class MaterialsController {
  constructor(
    private readonly materialsService: MaterialsService,
    private readonly materialLocationStockService: MaterialLocationStockService,
  ) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Body(ValidationPipe) createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.materialsService.findAll();
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(id, updateMaterialDto);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(id);
  }

  // STOCK ENDPOINTS

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get('stock/:locationId')
  findAllLocationStock(@Param('locationId') locationId: string) {
    return this.materialLocationStockService.findAll(locationId);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get('stock/:locationId/:materialId')
  findOneLocationStock(
    @Param('materialId') materialId: string,
    @Param('locationId') locationId: string,
  ) {
    return this.materialLocationStockService.findOne(materialId, locationId);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch('stock/:locationId')
  updateStock(
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) updateMaterialStockDto: UpdateMaterialStockDto[],
  ) {
    return this.materialLocationStockService.update(
      locationId,
      updateMaterialStockDto,
    );
  }
}
