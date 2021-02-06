import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { FinanceController } from './finance.controller';

@Module({
  controllers: [ApiController, FinanceController],
})
export class ApiModule {}
export class FinanceModule {}
