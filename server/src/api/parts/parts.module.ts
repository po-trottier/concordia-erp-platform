import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartsService } from './parts/parts.service';
import { PartsController } from './parts/parts.controller';
import { Part, PartSchema } from './parts/schemas/part.schema';
import { PartLog, PartLogSchema } from './parts-logs/schemas/part-log.schema';
import { PartLogsController } from './parts-logs/part-logs.controller';
import { PartLogsService } from './parts-logs/part-logs.service';

/**
 * Contains all logic and files related to parts
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Part.name, schema: PartSchema }]),
    MongooseModule.forFeature([{ name: PartLog.name, schema: PartLogSchema }]),
  ],
  controllers: [PartLogsController, PartsController],
  providers: [PartsService, PartLogsService],
})
export class PartsModule {}
