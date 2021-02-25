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
import { FinanceService } from './finance.service';
import { CreateFinanceEntryDto } from './dto/create-finance-entry.dto';
import { UpdateFinanceEntryDto } from './dto/update-finance-entry.dto';

/**
 * Controller class of the finentry entity
 */
@Controller()
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  /**
   * Handles POST requests to create FinEntry
   *
   * @param createFinanceEntryDto dto used to create finentry
   */
  @Post()
  create(@Body(ValidationPipe) createFinanceEntryDto: CreateFinanceEntryDto) {
    return this.financeService.create(createFinanceEntryDto);
  }

  /**
   * Handles GET requests to find all finentry
   */
  @Get()
  findAll() {
    return this.financeService.findAll();
  }

  /**
   * Handles GET requests to find a finentry by id
   *
   * @param id string of the finentry's objectId
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financeService.findOne(id);
  }

  /**
   * Handles PATCH requests to update a finentry by id
   *
   * @param id string of the finentry's objectId
   * @param updateFinanceEntryDto dto used to update finentry
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateFinanceEntryDto: UpdateFinanceEntryDto,
  ) {
    return this.financeService.update(id, updateFinanceEntryDto);
  }

  /**
   * Handles DELETE requests to delete a finentry by id
   *
   * @param id string of the finentry's objectId
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financeService.remove(id);
  }
}
