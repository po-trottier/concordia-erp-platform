import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { MaterialSchema, Material } from './schemas/material.schema';

/**
 * Contains all logic and files related to Materials
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Material.name, schema: MaterialSchema }]),
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
