import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PartsService } from './parts/parts.service';
import { PartsController } from './parts/parts.controller';
import { Part, PartSchema } from './parts/schemas/part.schema';
import { PartStock, PartStockSchema } from './parts/schemas/part-stock.schema';
import { PartLog, PartLogSchema } from './parts-logs/schemas/part-log.schema';
import { PartLogsController } from './parts-logs/part-logs.controller';
import { PartLogsService } from './parts-logs/part-logs.service';
import { LocationsModule } from '../locations/locations.module';
import { PartStockService } from './parts/part-stock.service';
import { MaterialsModule } from '../materials/materials.module';
import { PartBuilderService } from './parts/part-builder.service';
import { ProductsModule } from '../products/products.module';
import { PartListener } from '../../events/listeners/part.listener';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { validate } from '../../shared/env';

/**
 * Contains all logic and files related to parts
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Part.name, schema: PartSchema },
      { name: PartLog.name, schema: PartLogSchema },
      { name: PartStock.name, schema: PartStockSchema },
    ]),
    // Avoid Circular Dependencies
    forwardRef(() => LocationsModule),
    forwardRef(() => MaterialsModule),
    forwardRef(() => ProductsModule),
    // Events Listener Dependency
    UsersModule,
    EventsModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [PartLogsController, PartsController],
  providers: [
    PartsService,
    PartLogsService,
    PartStockService,
    PartBuilderService,
    PartListener,
  ],
  exports: [PartsService, PartStockService, MongooseModule],
})
export class PartsModule {}
