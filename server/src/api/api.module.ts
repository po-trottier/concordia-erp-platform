import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiController } from './api.controller';

@Module({
import { PartsModule } from './parts/parts.module';
import { FinentryModule } from './finance/finentry.module';

const mongoDbUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const mongoDbName = process.env.DB_NAME || 'ERP_db';

@Module({
  imports: [
    MongooseModule.forRoot(`${mongoDbUrl}/${mongoDbName}`),
    PartsModule, FinentryModule
  ],
  controllers: [ApiController],
})
