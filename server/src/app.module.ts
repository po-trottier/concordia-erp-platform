import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiModule } from './api/api.module';
import { FinanceService } from './finance/finance.service';

@Module({
  imports: [
    ApiModule,
    // Use the output of the react build as static assets
    // Relative path: ../../client/build
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
      exclude: ['/api*'],
    }),
  ],
  providers: [FinanceService],
})
export class AppModule {}
