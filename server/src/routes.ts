import { Routes } from 'nest-router';
import { ApiModule } from './api/api.module';
import { AuthModule } from './api/auth/auth.module';
import { PartsModule } from './api/parts/parts.module';
import { UsersModule } from './api/users/users.module';

export const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/parts',
        module: PartsModule,
      },
      {
        path: '/users',
        module: UsersModule,
      },
      {
        path: '/finance',
        module: FinentryModule,
      },
    ],
  },
];
