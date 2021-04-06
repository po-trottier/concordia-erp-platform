import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location, LocationSchema } from './schemas/location.schema';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../../shared/env';
import { PartsModule } from '../parts/parts.module';
import { MaterialsModule } from '../materials/materials.module';
import { ProductsModule } from '../products/products.module';

/**
 * Contains all logic and files related to locations
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
    // Avoid Circular Dependencies
    forwardRef(() => MaterialsModule),
    forwardRef(() => PartsModule),
    forwardRef(() => ProductsModule),
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
