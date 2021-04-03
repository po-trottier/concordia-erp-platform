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
import { BuildPartDto } from './dto/build-part.dto';
import { PartBuilderService } from './part-builder.service';

@Controller()
export class PartsController {
  constructor(
    private readonly partsService: PartsService,
    private readonly partLocationStockService: PartLocationStockService,
    private readonly partBuilderService: PartBuilderService,
  ) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Body(ValidationPipe) createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  /**
   * Route for building parts from materials
   *
   * @param locationId id of the location
   * @param buildOrders list of build orders for parts
   */
  @Roles(
    Role.INVENTORY_MANAGER,
    Role.SYSTEM_ADMINISTRATOR,
    Role.PRODUCTION_MACHINE,
  )
  @Patch('build/:locationId')
  build(
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) buildOrders: BuildPartDto[],
  ) {
    return this.partBuilderService.build(locationId, buildOrders);
  }

  @Roles(Role.ANY)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @Roles(Role.ANY)
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

  @Roles(Role.ANY)
  @Get('stock/:locationId')
  findAllLocationStock(@Param('locationId') locationId: string) {
    return this.partLocationStockService.findAll(locationId);
  }

  @Roles(Role.ANY)
  @Get('stock/:locationId/:partId')
  findOneLocationStock(
    @Param('partId') partId: string,
    @Param('locationId') locationId: string,
  ) {
    return this.partLocationStockService.findOne(partId, locationId);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch('stock/:locationId')
  updateStock(
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) updatePartStockDto: UpdatePartStockDto[],
  ) {
    return this.partLocationStockService.update(locationId, updatePartStockDto);
  }
}
