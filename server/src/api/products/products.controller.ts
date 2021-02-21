import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Roles } from "../roles/roles.decorator";
import { Role } from "../roles/roles.enum";
import { ProductsService } from './products.service';
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from './dto/update-product.dto';

/**
 * Controller class for the products
 */
@Controller()
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}
    
    /**
     * Handles POST requests to create products
     * @param createProductDto 
     */
    @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR,)
    @Post()
    create(@Body(ValidationPipe) createProductDto: CreateProductDto){
        return this.productService.create(createProductDto)
    }

    /**
     * Handles GET requests to retrieve all products
     */
    @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
    @Get()
    findAll(){
        return this.productService.findAll();
    }

    /**
     * Handles GET request to fetch product with given id
     * @param id 
     */
    @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productService.findOne(id);
    }

    /**
     * Handles PATCH request to update an existing product by id
     * @param id 
     * @param updateProductDto 
     */
    @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateProductDto: UpdateProductDto){
        return this.productService.update(id, updateProductDto);
    }

    /**
     * Handles DELETE requests to remove an existing product by id
     * @param id 
     */
    @Roles(Role.INVENTORY_MANAGER, Role.SYSTEM_ADMINISTRATOR)
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.productService.remove(id);
    }
}