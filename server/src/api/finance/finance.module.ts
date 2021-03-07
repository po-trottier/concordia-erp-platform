import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { FinanceEntry, FinanceEntrySchema } from './schemas/finance.schema';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';

/**
 * Contains all logic and files related to finance
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FinanceEntry.name, schema: FinanceEntrySchema },
    ]),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
