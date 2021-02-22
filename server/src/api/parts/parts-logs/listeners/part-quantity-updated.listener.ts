import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PartQuantityUpdatedEvent } from '../../parts/events/part-quantity-updated.event';
import { UpdatePartLogDto } from '../dto/update-part-log.dto';
import { PartLogsService } from '../part-logs.service';

@Injectable()
export class PartQuantityUpdatedListener {
  constructor(private readonly partsLogService: PartLogsService) {}

  @OnEvent('part.quantity.updated')
  handlePartQuantityUpdatedEvent(event: PartQuantityUpdatedEvent) {
    const updatePartLogDto: UpdatePartLogDto = {
      ...event,
    };
    this.partsLogService.update(updatePartLogDto);
  }
}
