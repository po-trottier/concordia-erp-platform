import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { PartRepository } from './part.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Contains all logic and files related to parts
 */
@Module({
  imports: [TypeOrmModule.forFeature([PartRepository])],
  controllers: [PartsController],
  providers: [PartsService],
})
export class PartsModule {}
