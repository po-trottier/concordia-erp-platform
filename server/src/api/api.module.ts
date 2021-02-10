import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiController } from './api.controller';
import { PartsModule } from './parts/parts.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/ERP_db'), PartsModule],
  controllers: [ApiController],
})
export class ApiModule {}
