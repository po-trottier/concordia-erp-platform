import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialsService } from './materials/materials.service';
import { MaterialsController } from './materials/materials.controller';
import { Material, MaterialSchema } from './materials/schemas/material.schema';
import {
  MaterialLog,
  MaterialLogSchema,
} from './materials-logs/schemas/material-log.schema';
import { MaterialLogsController } from './materials-logs/material-logs.controller';
import { MaterialLogsService } from './materials-logs/material-logs.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';
import { MaterialLocationStockService } from './materials/material-location-stock.service';
import { LocationsModule } from '../locations/locations.module';
import {
  MaterialLocationStock,
  MaterialLocationStockSchema,
} from './materials/schemas/material-location-stock.schema';

/**
 * Contains all logic and files related to Materials
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
    ]),
    MongooseModule.forFeature([
      { name: MaterialLog.name, schema: MaterialLogSchema },
    ]),
    MongooseModule.forFeature([
      { name: MaterialLocationStock.name, schema: MaterialLocationStockSchema },
    ]),
    LocationsModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [MaterialLogsController, MaterialsController],
  providers: [
    MaterialsService,
    MaterialLogsService,
    MaterialLocationStockService,
  ],
  exports: [MaterialLocationStockService]
})
export class MaterialsModule {}
