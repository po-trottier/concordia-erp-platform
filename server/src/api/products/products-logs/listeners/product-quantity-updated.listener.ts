import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductQuantityUpdatedEvent } from '../../products/events/product-quantity-updated.event';
import { UpdateProductLogDto } from '../dto/update-product-log.dto';
import { ProductLogsService } from '../product-logs.service';

@Injectable()
export class ProductQuantityUpdatedListener {
  constructor(private readonly productsLogService: ProductLogsService) {}

  @OnEvent('product.quantity.updated')
  handleProductQuantityUpdatedEvent(event: ProductQuantityUpdatedEvent) {
    const updateProductLogDto: UpdateProductLogDto = {
      ...event,
    };
    this.productsLogService.update(updateProductLogDto);
  }
}
