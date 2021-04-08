import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location, LocationSchema } from './schemas/location.schema';
import { ConfigModule } from '@nestjs/config';
import { PartsModule } from '../parts/parts.module';
import { MaterialsModule } from '../materials/materials.module';
import { ProductsModule } from '../products/products.module';
import { LocationListener } from '../../events/listeners/location.listener';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { validate } from '../../shared/env';
import { AuthModule } from '../auth/auth.module';
import { AuditsModule } from '../audits/audits.module';

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
    // Events Listener Dependency
    UsersModule,
    EventsModule,
    AuthModule,
    AuditsModule,
    // ENV Support
    ConfigModule.forRoot({ validate, cache: true }),
  ],
  controllers: [LocationsController],
  providers: [LocationsService, LocationListener],
  exports: [LocationsService],
})
export class LocationsModule {}
