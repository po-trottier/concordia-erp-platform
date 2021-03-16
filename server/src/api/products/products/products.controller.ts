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
import { ProductLocationStockService } from './product-location-stock.service';

/**
 * Controller class for the products
 */
@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productLocationStockService: ProductLocationStockService,
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

  /**
   * Handles GET requests to retrieve all products
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.productsService.findAll();
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
   * Handles DELETE requests to remove an existing product by id
   * @param id
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  // STOCK ENDPOINTS

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get('stock/:locationId')
  findAllLocationStock(@Param('locationId') locationId: string) {
    return this.productLocationStockService.findAll(locationId);
  }

  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Get('stock/:locationId/:productId')
  findOneLocationStock(
    @Param('locationId') locationId: string,
    @Param('productId') productId: string,
  ) {
    return this.productLocationStockService.findOne(productId, locationId);
  }

  /**
   * Handles PATCH request to update an existing product by id
   * HANDLES UPDATES FOR STOCK
   * @param productId id of the product
   * @param locationId id of the location
   * @param updateProductStockDto
   */
  @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
  @Patch('stock/:locationId/:productId')
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
}
