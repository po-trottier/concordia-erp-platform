import { Routes } from 'nest-router';
import { ApiModule } from './api/api.module';
import { AuthModule } from './api/auth/auth.module';
import { PartsModule } from './api/parts/parts.module';
import { MaterialsModule } from './api/materials/materials.module';
import { UsersModule } from './api/users/users.module';
import { ProductsModule } from './api/products/products.module';
import { OrdersModule } from './api/orders/orders.module';
import { LocationsModule } from './api/locations/locations.module';

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
        path: '/orders',
        module: OrdersModule,
      },
      {
        path: '/products',
        module: ProductsModule,
      },
      {
        path: '/locations',
        module: LocationsModule,
      },
    ],
  },
];
