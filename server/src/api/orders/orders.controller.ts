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
import { ProductOrdersService } from './product-orders.service';
import { MaterialsService } from '../materials/materials/materials.service';
import { OrderDetailsService } from './order-details.service';
import { CreateMaterialOrderListDto } from './dto/create-material-order-list.dto';
import { CreateProductOrderListDto } from './dto/create-product-order-list.dto';
import { Role } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';

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

  @Roles(Role.ACCOUNTANT, Role.SYSTEM_ADMINISTRATOR)
  @Post('materials')
  createMaterialOrder(
    @Body(ValidationPipe)
    createMaterialOrderListDto: CreateMaterialOrderListDto,
  ) {
    return this.materialOrderService.createMaterialOrder(
      createMaterialOrderListDto,
    );
  }

  @Roles(Role.ACCOUNTANT, Role.SYSTEM_ADMINISTRATOR)
  @Get('materials/all')
  async findAllMaterialsOrder() {
    return this.materialOrderService.findAll(this.materialsService);
  }

  @Roles(Role.ACCOUNTANT, Role.SYSTEM_ADMINISTRATOR)
  @Get('materials/:id')
  findOneMaterialOrder(@Param('id') id: string) {
    return this.materialOrderService.findOne(id);
  }

  @Delete('materials/:id')
  removeMaterialOrder(@Param('id') id: string) {
    return this.materialOrderService.remove(id);
  }

  @Roles(Role.ACCOUNTANT, Role.SYSTEM_ADMINISTRATOR)
  @Post('products')
  createProductOrder(
    @Body(ValidationPipe) createProductOrderListDto: CreateProductOrderListDto,
  ) {
    return this.productOrderService.createProductOrder(
      createProductOrderListDto,
    );
  }

  @Roles(Role.ACCOUNTANT, Role.SYSTEM_ADMINISTRATOR)
  @Get('products/all')
  findAllProductsOrder() {
    return this.productOrderService.findAll();
  }

  @Roles(Role.ACCOUNTANT, Role.SYSTEM_ADMINISTRATOR)
  @Get('products/:id')
  findOneProductOrder(@Param('id') id: string) {
    return this.productOrderService.findOne(id);
  }

  @Roles(Role.ACCOUNTANT, Role.SYSTEM_ADMINISTRATOR)
  @Delete('products/:id')
  removeProductOrder(@Param('id') id: string) {
    return this.productOrderService.remove(id);
  }

  @Roles(Role.ACCOUNTANT, Role.SYSTEM_ADMINISTRATOR)
  @Get('balance')
  balance() {
    return this.orderDetailsService.getBalance(
      this.productOrderService,
      this.materialOrderService,
    );
  }

  @Roles(Role.ACCOUNTANT, Role.SYSTEM_ADMINISTRATOR)
  @Get('summary')
  summary() {
    return this.orderDetailsService.getSummary(
      this.productOrderService,
      this.materialOrderService,
    );
  }
}
