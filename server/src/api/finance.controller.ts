import { Controller, Get } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Part } from '../finance/entities/finance.entity';
// import { PartsModule } from '../finance/finance.module';
import { CreateFinancialEntryDto } from '../finance/dto/create-financial-entry.dto';

@Controller('finance')
export class FinanceController {
  @Get()
  getStatus(): { status: string } {
    return { status: 'Running' };
  }

  @Get('expenses')
  getExpenses() : string {
    return 'This action should return the expenses';
  }

  @Get('income')
  getIncome() : string {
    return 'This action should return the income';
  }

  @Post()
  async create(@Body() createFinancialEntry: CreateFinancialEntryDto) 
  {
    return 'This action creates a new financial statement';
  }
}
