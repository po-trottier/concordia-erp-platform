import { Controller, Get } from '@nestjs/common';

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
}
