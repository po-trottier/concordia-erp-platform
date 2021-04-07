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
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { UpdatePartStockDto } from './dto/update-part-stock.dto';
import { PartStockService } from './part-stock.service';
import { BuildPartDto } from './dto/build-part.dto';
import { PartBuilderService } from './part-builder.service';

@Controller()
export class PartsController {
  constructor(
    private readonly partsService: PartsService,
    private readonly partStockService: PartStockService,
    private readonly partBuilderService: PartBuilderService,
  ) {}

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(
    @Headers('authorization') auth: string,
    @Body(ValidationPipe) createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto, auth);
  }

  /**
   * Route for building parts from materials
   *
   * @param auth
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
    @Headers('authorization') auth: string,
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) buildOrders: BuildPartDto[],
  ) {
    return this.partBuilderService.build(auth, locationId, buildOrders);
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
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body(ValidationPipe) updatePartDto: UpdatePartDto,
  ) {
    return this.partsService.update(id, updatePartDto, auth);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('authorization') auth: string,) {
    return this.partsService.remove(id, auth);
  }

  // STOCK ENDPOINTS

  @Roles(Role.ANY)
  @Get('stock/:locationId')
  findAllStocks(@Param('locationId') locationId: string) {
    return this.partStockService.findAll(locationId);
  }

  @Roles(Role.ANY)
  @Get('stock/:locationId/:partId')
  findOneStock(
    @Param('partId') partId: string,
    @Param('locationId') locationId: string,
  ) {
    return this.partStockService.findOne(partId, locationId);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch('stock/:locationId')
  updateStock(
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) updatePartStockDto: UpdatePartStockDto[],
  ) {
    return this.partStockService.update(locationId, updatePartStockDto);
  }
}
