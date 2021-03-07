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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order-entry.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

/**
 * Controller class of the Order entity
 */
@Controller()
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  /**
   * Handles POST requests to create Order
   *
   * @param createOrderDto dto used to create a finance entry
   */
  @Post()
  create(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  /**
   * Handles GET requests to find all finance entries
   */
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  /**
   * Handles GET requests to find a finentry by id
   *
   * @param id string of the finentry's objectId
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  /**
   * Handles PATCH requests to update a finentry by id
   *
   * @param id string of the finentry's objectId
   * @param updateOrderDto dto used to update finentry
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  /**
   * Handles DELETE requests to delete a finentry by id
   *
   * @param id string of the finentry's objectId
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
