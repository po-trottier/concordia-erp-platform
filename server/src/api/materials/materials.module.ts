import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialsService } from './materials/materials.service';
import { MaterialsController } from './materials/materials.controller';
import { MaterialSchema, Material } from './materials/schemas/material.schema';
import { MaterialLog, MaterialLogSchema } from './materials-logs/schemas/material-log.schema';
import { MaterialLogsController } from './materials-logs/material-logs.controller';
import { MaterialLogsService } from './materials-logs/material-logs.service';

/**
 * Contains all logic and files related to Materials
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Material.name, schema: MaterialSchema }]),
    MongooseModule.forFeature([{ name: MaterialLog.name, schema: MaterialLogSchema }])
  ],
  controllers: [MaterialsController, MaterialLogsController],
  providers: [MaterialsService, MaterialLogsService],
})
export class MaterialsModule {}
