import { Routes } from 'nest-router';
import { ApiModule } from './api/api.module';
import { AuthModule } from './api/auth/auth.module';
import { PartsModule } from './api/parts/parts.module';
import { MaterialsModule } from './api/materials/materials.module';
import { UsersModule } from './api/users/users.module';
import { FinanceModule } from './api/finance/finance.module';
import { ProductsModule } from './api/products/products.module';

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
        path: '/materials',
        module: MaterialsModule,
      },
      {
        path: '/users',
        module: UsersModule,
      },
      {
        path: '/finance',
        module: FinanceModule,
      },
      {
        path: '/products',
        module: ProductsModule,
      },
    ],
  },
];
