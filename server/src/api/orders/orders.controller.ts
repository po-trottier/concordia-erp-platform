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
import { MaterialOrdersService } from './material-orders.service';
import { ProductOrdersService } from './product-orders.service';
import { OrderDetailsService } from './order-details.service';
import { Role } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { CreateMaterialOrderDto } from './dto/create-material-order.dto';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { UpdateMaterialOrderDto } from './dto/update-material-order.dto';

/**
 * Controller class of the Order entity
 */
@Controller()
export class OrdersController {
  constructor(
    private readonly materialOrderService: MaterialOrdersService,
    private readonly productOrderService: ProductOrdersService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  @Roles(Role.SYSTEM_ADMINISTRATOR, Role.INVENTORY_MANAGER)
  @Post('materials')
  createMaterialOrder(
    @Body(ValidationPipe)
    createMaterialOrderDto: CreateMaterialOrderDto[],
  ) {
    return this.materialOrderService.createMaterialOrder(
      createMaterialOrderDto,
    );
  }

  @Roles(Role.ANY)
  @Get('materials/all')
  async findAllMaterialsOrder() {
    return this.materialOrderService.findAll();
  }

  @Roles(Role.ANY)
  @Get('materials/:id')
  findOneMaterialOrder(@Param('id') id: string) {
    return this.materialOrderService.findOne(id);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Delete('materials/:id')
  removeMaterialOrder(@Param('id') id: string) {
    return this.materialOrderService.remove(id);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR, Role.INVENTORY_MANAGER)
  @Patch('materials/:id')
  updateMaterialOrder(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMaterialOrderDto: UpdateMaterialOrderDto,
  ) {
    return this.materialOrderService.update(id, updateMaterialOrderDto);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR, Role.SALESPERSON)
  @Post('products')
  createProductOrder(
    @Body(ValidationPipe) createProductOrderDto: CreateProductOrderDto[],
  ) {
    return this.productOrderService.create(createProductOrderDto);
  }

  @Roles(Role.ANY)
  @Get('products/all')
  findAllProductsOrder() {
    return this.productOrderService.findAll();
  }

  @Roles(Role.ANY)
  @Get('products/:id')
  findOneProductOrder(@Param('id') id: string) {
    return this.productOrderService.findOne(id);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Delete('products/:id')
  removeProductOrder(@Param('id') id: string) {
    return this.productOrderService.remove(id);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR, Role.SALESPERSON)
  @Patch('products/:id')
  updateProductOrder(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductOrderDto: UpdateProductOrderDto,
  ) {
    return this.productOrderService.update(id, updateProductOrderDto);
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
