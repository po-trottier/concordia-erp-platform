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
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { BuildProductDto } from './dto/build-product.dto';
import { ProductStockService } from './product-stock.service';
import { ProductBuilderService } from './product-builder.service';

/**
 * Controller class for the products
 */
@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productStockService: ProductStockService,
    private readonly productBuilderService: ProductBuilderService,
  ) {}

  /**
   * Handles POST requests to create products
   * @param auth
   * @param createProductDto
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(
    @Headers('authorization') auth: string,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, auth);
  }

  /**
   * Handles GET requests to retrieve all products
   */
  @Roles(Role.ANY)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  /**
   * Handles GET request to fetch product with given id
   * @param id
   */
  @Roles(Role.ANY)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  /**
   * Handles PATCH request to update an existing product by id
   * @param id
   * @param auth
   * @param updateProductDto
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, auth, updateProductDto);
  }

  /**
   * Route for building products from parts
   *
   * @param locationId id of the location
   * @param buildOrders
   */
  @Roles(
    Role.INVENTORY_MANAGER,
    Role.SYSTEM_ADMINISTRATOR,
    Role.PRODUCTION_MACHINE,
  )
  @Patch('build/:locationId')
  build(
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) buildOrders: BuildProductDto[],
  ) {
    return this.productBuilderService.build(locationId, buildOrders);
  }

  /**
   * Handles DELETE requests to remove an existing product by id
   * @param id
   * @param auth
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('authorization') auth: string) {
    return this.productsService.remove(id, auth);
  }

  // STOCK ENDPOINTS

  @Roles(Role.ANY)
  @Get('stock/:locationId')
  findAllStock(@Param('locationId') locationId: string) {
    return this.productStockService.findAll(locationId);
  }

  @Roles(Role.ANY)
  @Get('stock/:locationId/:productId')
  findOneStock(
    @Param('locationId') locationId: string,
    @Param('productId') productId: string,
  ) {
    return this.productStockService.findOne(productId, locationId);
  }

  /**
   * Handles PATCH request to update an existing product by id
   * HANDLES UPDATES FOR STOCK
   * @param locationId id of the location
   * @param updateProductStockDto
   */
  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Patch('stock/:locationId')
  updateStock(
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) updateProductStockDto: UpdateProductStockDto[],
  ) {
    return this.productStockService.update(locationId, updateProductStockDto);
  }
}
