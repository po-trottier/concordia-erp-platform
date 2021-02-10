import { Routes } from 'nest-router';
import { ApiModule } from './api/api.module';
import { PartsModule } from './api/parts/parts.module';

export const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [
      {
        path: '/parts',
        module: PartsModule,
      },
    ],
  },
];
