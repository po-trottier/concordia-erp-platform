import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { MaterialOrdersService } from './material-orders.service';
import { CreateMaterialOrderListDto } from './dto/create-material-order-list.dto';
import { ProductOrdersService } from './product-orders.service';
import { CreateProductOrderListDto } from './dto/create-product-order-list.dto';
import { MaterialsService } from '../materials/materials/materials.service';
import { OrderDetailsService } from './order-details.service';

/**
 * Controller class of the Order entity
 */
@Controller()
export class OrdersController {
  constructor(
    private readonly materialOrderService: MaterialOrdersService,
    private readonly productOrderService: ProductOrdersService,
    private readonly materialsService: MaterialsService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  @Post('materials')
  createMaterialOrder(
    @Body(ValidationPipe)
    createMaterialOrderListDto: CreateMaterialOrderListDto,
  ) {
    return this.materialOrderService.createMaterialOrder(
      createMaterialOrderListDto,
    );
  }

  @Get('materials/all')
  async findAllMaterialsOrder() {
    return this.materialOrderService.findAll(this.materialsService);
  }

  @Get('materials/:id')
  findOneMaterialOrder(@Param('id') id: string) {
    return this.materialOrderService.findOne(id);
  }

  @Delete('materials/:id')
  removeMaterialOrder(@Param('id') id: string) {
    return this.materialOrderService.remove(id);
  }

  @Post('products')
  createProductOrder(
    @Body(ValidationPipe) createProductOrderListDto: CreateProductOrderListDto,
  ) {
    return this.productOrderService.createProductOrder(
      createProductOrderListDto,
    );
  }

  @Get('products/all')
  findAllProductsOrder() {
    return this.productOrderService.findAll();
  }

  @Get('products/:id')
  findOneProductOrder(@Param('id') id: string) {
    return this.productOrderService.findOne(id);
  }

  @Delete('products/:id')
  removeProductOrder(@Param('id') id: string) {
    return this.productOrderService.remove(id);
  }

  @Get('balance')
  balance() {
    return this.orderDetailsService.getBalance(
      this.productOrderService,
      this.materialOrderService,
    );
  }

  @Get('summary')
  summary() {
    return this.orderDetailsService.getSummary(
      this.productOrderService,
      this.materialOrderService,
    );
  }
}
