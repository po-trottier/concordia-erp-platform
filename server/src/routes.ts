import { Routes } from 'nest-router';
import { ApiModule } from './api/api/api.module';
import { AuthModule } from './api/auth/auth.module';
import { PartsModule } from './api/parts/parts.module';
import { MaterialsModule } from './api/materials/materials.module';
import { UsersModule } from './api/users/users.module';
import { ProductsModule } from './api/products/products.module';
import { OrdersModule } from './api/orders/orders.module';
import { LocationsModule } from './api/locations/locations.module';
import { CustomersModule } from './api/customers/customers.module';
import { EventsModule } from './api/events/events.module';
import {AuditsModule} from "./api/audits/audits.module";

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
        path: '/audits',
        module: AuditsModule,
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
      {
        path: '/customers',
        module: CustomersModule,
      },
      {
        path: '/events',
        module: EventsModule,
      },
    ],
  },
];
