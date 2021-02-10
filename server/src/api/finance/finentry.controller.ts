import {
  Get,
  Post,
  Patch,
  Delete,
  Controller,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { FinentryService } from './finentry.service';
import { CreateFinentryDto } from './dto/create-finentry.dto';
import { UpdateFinentryDto } from './dto/update-finentry.dto';

/**
 * Controller class of the finentry entity
 */
@Controller('api/finentry')
export class FinEntryController {
  constructor(private readonly finentryService: FinEntryService) {}

  /**
   * Handles POST requests to create FinEntry
   *
   * @param createFinentryDto dto used to create finentry
   */
  @Post()
  create(@Body(ValidationPipe) createFinentryDto: CreateFinentryDto) {
    return this.finentryService.create(createFinentryDto);
  }

  /**
   * Handles GET requests to find all finentry
   */
  @Get()
  findAll() {
    return this.finentryService.findAll();
  }

  /**
   * Handles GET requests to find a finentry by id
   *
   * @param id string of the finentry's objectId
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.finentryService.findOne(id);
  }

  /**
   * Handles PATCH requests to update a finentry by id
   *
   * @param id string of the finentry's objectId
   * @param updateFinentryDto dto used to update finentry
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateFinentryDto: UpdateFinentryDto,
  ) {
    return this.finentryService.update(id, updateFinentryDto);
  }

  /**
   * Handles DELETE requests to delete a finentry by id
   *
   * @param id string of the finentry's objectId
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.finentryService.remove(id);
  }
}
