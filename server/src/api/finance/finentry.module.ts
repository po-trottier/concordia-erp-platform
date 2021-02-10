import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinentryService } from './finentry.service';
import { FinentryController } from './finentry.controller';
import { FinentrySchema, Finentry } from './schemas/finentry.schema';

/**
 * Contains all logic and files related to finentry
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Finentry.name, schema: FinentrySchema }]),
  ],
  controllers: [FinentryController],
  providers: [FinentryService],
})
export class FinentryModule {}
