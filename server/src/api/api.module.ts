import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { PartsModule } from '../parts/parts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/ERP_db'), PartsModule],
  controllers: [ApiController],
})
export class ApiModule {}
