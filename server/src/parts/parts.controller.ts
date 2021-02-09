import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

/**
 * Controller class of the part entity
 */
@Controller('api/parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  /**
   * Handles POST requests to create Parts
   *
   * @param createPartDto dto used to create parts
   */
  @Post()
  create(@Body(ValidationPipe) createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  /**
   * Handles GET requests to find all parts
   */
  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  /**
   * Handles GET requests to find a part by id
   *
   * @param id string of the part's objectId
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  /**
   * Handles PATCH requests to update a part by id
   *
   * @param id string of the part's objectId
   * @param updatePartDto dto used to update parts
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePartDto: UpdatePartDto,
  ) {
    return this.partsService.update(id, updatePartDto);
  }

  /**
   * Handles DELETE requests to delete a part by id
   *
   * @param id string of the part's objectId
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partsService.remove(id);
  }
}
