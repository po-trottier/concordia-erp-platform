import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiModule } from './api/api.module';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    ApiModule,
    // Use the output of the react build as static assets
    // Relative path: ../../client/build
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
      exclude: ['/api*'],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
