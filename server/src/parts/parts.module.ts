import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartSchema, Part } from './schemas/part.schema';

/**
 * Contains all logic and files related to parts
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Part.name, schema: PartSchema }]),
  ],
  controllers: [PartsController],
  providers: [PartsService],
})
export class PartsModule {}
