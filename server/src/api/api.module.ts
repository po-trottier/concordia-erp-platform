import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from '../parts/entities/part.entity';
import { PartsModule } from '../parts/parts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/ERP_db',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Part],
    }),
    PartsModule,
  ],
  controllers: [ApiController],
})
export class ApiModule {}
