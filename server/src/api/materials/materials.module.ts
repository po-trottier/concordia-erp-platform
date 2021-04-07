import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MaterialsService } from './materials/materials.service';
import { MaterialsController } from './materials/materials.controller';
import { Material, MaterialSchema } from './materials/schemas/material.schema';
import {
  MaterialLog,
  MaterialLogSchema,
} from './materials-logs/schemas/material-log.schema';
import {
  MaterialStock,
  MaterialStockSchema,
} from './materials/schemas/material-stock.schema';
import { MaterialLogsController } from './materials-logs/material-logs.controller';
import { MaterialLogsService } from './materials-logs/material-logs.service';
import { MaterialStockService } from './materials/material-stock.service';
import { LocationsModule } from '../locations/locations.module';
import { PartsModule } from '../parts/parts.module';
import { MaterialListener } from '../../events/listeners/material.listener';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { validate } from '../../shared/env';

/**
 * Contains all logic and files related to Materials
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
      { name: MaterialLog.name, schema: MaterialLogSchema },
      { name: MaterialStock.name, schema: MaterialStockSchema },
    ]),
    // Avoid Circular Dependencies
    forwardRef(() => LocationsModule),
    forwardRef(() => PartsModule),
    // Events Listener Dependency
    UsersModule,
    EventsModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [MaterialLogsController, MaterialsController],
  providers: [
    MaterialsService,
    MaterialLogsService,
    MaterialStockService,
    MaterialListener,
  ],
  exports: [MaterialsService, MaterialStockService, MongooseModule],
})
export class MaterialsModule {}
