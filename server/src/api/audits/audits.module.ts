import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditsService } from './audits.service';
import { AuditsController } from './audits.controller';
import { Audit, AuditSchema } from './schemas/audits.schema';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';

/**
 * Contains all logic and files related to Customer
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Audit.name, schema: AuditSchema },
    ]),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [AuditsController],
  providers: [AuditsService],
  exports: [AuditsService],
})
export class AuditsModule {}
