import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { MaterialOrdersService } from './material-orders.service';
import { CreateMaterialOrderListDto } from './dto/create-material-order-list.dto';

/**
 * Controller class of the Order entity
 */
@Controller()
export class OrdersController {
  constructor(private readonly materialOrderService: MaterialOrdersService) {}

  @Post('materials')
  createMaterial(@Body(ValidationPipe) createMaterialOrderListDto: CreateMaterialOrderListDto) {
    return this.materialOrderService.createMaterialOrder(
      createMaterialOrderListDto,
    );
  }

  @Get('materials/all')
  findAllMaterials() {
    return this.materialOrderService.findAll();
  }

  @Get('materials/:id')
  findOneMaterial(@Param('id') id: string) {
    return this.materialOrderService.findOne(id);
  }

  @Delete('materials/:id')
  removeMaterial(@Param('id') id: string) {
    return this.materialOrderService.remove(id);
  }
}
