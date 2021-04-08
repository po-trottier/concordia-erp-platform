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
import { EventsService } from './events.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateEventDto } from './dto/create-event.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Post()
  create(@Headers('authorization') auth: string, @Body(ValidationPipe) CreateEventDto: CreateEventDto) {
    return this.eventsService.create(auth, CreateEventDto);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get('/all')
  findEvents() {
    return this.eventsService.findEvents();
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Patch(':id')
  update(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body(ValidationPipe) UpdateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(auth, id, UpdateEventDto);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Delete(':id')
  remove(@Headers('authorization') auth: string, @Param('id') id: string) {
    return this.eventsService.remove(auth, id);
  }
}
