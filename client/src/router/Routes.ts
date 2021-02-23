import { Home } from '../pages/Home';
import { Users } from '../pages/Users';
import { Products } from '../pages/Products';
import { Parts } from '../pages/Parts';
import { Materials } from '../pages/Materials';
import { Customers } from '../pages/Customers';
import { Finances } from '../pages/Finances';
import { Logs } from '../pages/Logs';

import { Route } from '../interfaces/Route';
import { Role } from './Roles';

export const Routes : Route[] = [
  {
    path: '/home',
    exact: false,
    title: 'Home',
    icon: 'home',
    page: Home,
    auth: [Role.ANY]
  },
  {
    path: '/finances',
    exact: false,
    title: 'Finances',
    icon: 'dollar',
    page: Finances,
    auth: [
      Role.ACCOUNTANT,
      Role.SYSTEM_ADMINISTRATOR
    ]
  },
  {
    path: '/products',
    exact: false,
    title: 'Products',
    icon: 'car',
    page: Products,
    auth: [
      Role.SYSTEM_ADMINISTRATOR,
      Role.INVENTORY_MANAGER,
      Role.SALESPERSON
    ]
  },
  {
    path: '/parts',
    exact: false,
    title: 'Parts',
    icon: 'setting',
    page: Parts,
    auth: [
      Role.SYSTEM_ADMINISTRATOR,
      Role.INVENTORY_MANAGER,
      Role.SALESPERSON
    ]
  },
  {
    path: '/materials',
    exact: false,
    title: 'Materials',
    icon: 'codepen',
    page: Materials,
    auth: [
      Role.SYSTEM_ADMINISTRATOR,
      Role.INVENTORY_MANAGER,
      Role.SALESPERSON
    ]
  },
  {
    path: '/customers',
    exact: false,
    title: 'Customers',
    icon: 'team',
    page: Customers,
    auth: [
      Role.SYSTEM_ADMINISTRATOR,
      Role.SALESPERSON
    ]
  },
  {
    path: '/users',
    exact: false,
    title: 'Users',
    icon: 'user',
    page: Users,
    auth: [Role.SYSTEM_ADMINISTRATOR]
  },
  {
    path: '/logs',
    exact: false,
    title: 'Logs & Audits',
    icon: 'bars',
    page: Logs,
    auth: [Role.SYSTEM_ADMINISTRATOR]
  }
];
