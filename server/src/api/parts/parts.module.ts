import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartsService } from './parts/parts.service';
import { PartsController } from './parts/parts.controller';
import { Part, PartSchema } from './parts/schemas/part.schema';
import {
  PartLocationStock,
  PartLocationStockSchema,
} from './parts/schemas/part-location-stock.schema';
import { PartLog, PartLogSchema } from './parts-logs/schemas/part-log.schema';
import { PartLogsController } from './parts-logs/part-logs.controller';
import { PartLogsService } from './parts-logs/part-logs.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';
import { LocationsModule } from '../locations/locations.module';
import { PartLocationStockService } from './parts/part-location-stock.service';

/**
 * Contains all logic and files related to parts
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Part.name, schema: PartSchema }]),
    MongooseModule.forFeature([{ name: PartLog.name, schema: PartLogSchema }]),
    MongooseModule.forFeature([
      { name: PartLocationStock.name, schema: PartLocationStockSchema },
    ]),
    LocationsModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [PartLogsController, PartsController],
  providers: [PartsService, PartLogsService, PartLocationStockService],
  exports: [PartLocationStockService],
})
export class PartsModule {}
