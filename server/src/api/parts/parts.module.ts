import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PartsService } from './parts/parts.service';
import { PartsController } from './parts/parts.controller';
import { Part, PartSchema } from './parts/schemas/part.schema';
import { Product, ProductSchema} from '../products/products/schemas/products.schema';
import { PartStock, PartStockSchema } from './parts/schemas/part-stock.schema';
import { PartLog, PartLogSchema } from './parts-logs/schemas/part-log.schema';
import { PartLogsController } from './parts-logs/part-logs.controller';
import { PartLogsService } from './parts-logs/part-logs.service';
import { validate } from '../../shared/env';
import { LocationsModule } from '../locations/locations.module';
import { PartStockService } from './parts/part-stock.service';
import { MaterialsModule } from '../materials/materials.module';
import { PartBuilderService } from './parts/part-builder.service';
import { ProductsModule } from '../products/products.module';

/**
 * Contains all logic and files related to parts
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Part.name, schema: PartSchema },
      { name: PartLog.name, schema: PartLogSchema },
      { name: PartStock.name, schema: PartStockSchema },
    ]),
    LocationsModule,
    // Avoid Circular Dependencies
    forwardRef(() => MaterialsModule),
    forwardRef(() => ProductsModule),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [PartLogsController, PartsController],
  providers: [
    PartsService,
    PartLogsService,
    PartStockService,
    PartBuilderService,
  ],
  exports: [PartsService, PartStockService, MongooseModule],
})
export class PartsModule {}
