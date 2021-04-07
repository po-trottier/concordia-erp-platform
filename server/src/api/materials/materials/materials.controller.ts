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
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { UpdateMaterialStockDto } from './dto/update-material-stock.dto';
import { MaterialStockService } from './material-stock.service';

@Controller()
export class MaterialsController {
  constructor(
    private readonly materialsService: MaterialsService,
    private readonly materialStockService: MaterialStockService,
  ) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Headers('authorization') auth: string,@Body(ValidationPipe) createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto, auth);
  }

  @Roles(Role.ANY)
  @Get()
  findAll() {
    return this.materialsService.findAll();
  }

  @Roles(Role.ANY)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch(':id')
  update(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body(ValidationPipe) updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(id, updateMaterialDto, auth);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Headers('authorization') auth: string, @Param('id') id: string) {
    return this.materialsService.remove(id, auth);
  }

  // STOCK ENDPOINTS

  @Roles(Role.ANY)
  @Get('stock/:locationId')
  findAllStocks(@Param('locationId') locationId: string) {
    return this.materialStockService.findAll(locationId);
  }

  @Roles(Role.ANY)
  @Get('stock/:locationId/:materialId')
  findOneStock(
    @Param('materialId') materialId: string,
    @Param('locationId') locationId: string,
  ) {
    return this.materialStockService.findOne(materialId, locationId);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Patch('stock/:locationId')
  updateStock(
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) updateMaterialStockDto: UpdateMaterialStockDto[],
  ) {
    return this.materialStockService.update(locationId, updateMaterialStockDto);
  }
}
