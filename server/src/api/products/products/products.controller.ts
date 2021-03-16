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
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { BuildProductDto } from './dto/build-product.dto';
import { ProductLocationStockService } from './product-location-stock.service';
import { ProductBuilderService } from './product-builder.service';

/**
 * Controller class for the products
 */
@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productLocationStockService: ProductLocationStockService,
    private readonly productBuilderService: ProductBuilderService,
  ) {}

  /**
   * Handles POST requests to create products
   * @param createProductDto
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get('stock/:locationId')
  findAllLocationStock(@Param('locationId') locationId: string) {
    return this.productLocationStockService.findAll(locationId);
  }

  /**
   * Handles GET requests to retrieve all products
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':productId/stock/:locationId')
  findOneLocationStock(
    @Param('productId') productId: string,
    @Param('locationId') locationId: string,
  ) {
    return this.productLocationStockService.findOne(productId, locationId);
  }

  /**
   * Handles GET request to fetch product with given id
   * @param id
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  /**
   * Handles PATCH request to update an existing product by id
   * HANDLES UPDATES FOR STOCK
   * @param productId id of the product
   * @param locationId id of the location
   * @param updateProductStockDto
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch(':productId/stock/:locationId')
  updateStock(
    @Param('productId') productId: string,
    @Param('locationId') locationId: string,
    @Body(ValidationPipe) updateProductStockDto: UpdateProductStockDto,
  ) {
    return this.productLocationStockService.update(
      productId,
      locationId,
      updateProductStockDto,
    );
  }

  /**
   * Handles PATCH request to update an existing product by id
   * @param id
   * @param updateProductDto
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  /**
   * Route for building products from parts
   *
   * @param productId id of the product
   * @param locationId id of the location
   * @param buildProductDto
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
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
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
