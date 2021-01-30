import {Dashboard} from '../pages/Dashboard';
import {Users} from '../pages/Users';
import {Products} from '../pages/Products';
import {Parts} from '../pages/Parts';
import {Materials} from '../pages/Materials';
import {Customers} from '../pages/Customers';
import {Finances} from '../pages/Finances';
import {Logs} from '../pages/Logs';

import {Route} from "../interfaces/Route";
import {RouteGuard} from './RouteGuards';

export const Routes : Route[] = [
  {
    path: '/dashboard',
    exact: false,
    title: 'Dashboard',
    icon: 'home',
    page: Dashboard,
    auth: [RouteGuard.ANY]
  },
  {
    path: '/users',
    exact: false,
    title: 'Users',
    icon: 'user',
    page: Users,
    auth: [RouteGuard.SYSTEM_ADMINISTRATOR]
  },
  {
    path: '/products',
    exact: false,
    title: 'Products',
    icon: 'car',
    page: Products,
    auth: [
      RouteGuard.SYSTEM_ADMINISTRATOR,
      RouteGuard.INVENTORY_MANAGER,
      RouteGuard.SALESPERSON
    ]
  },
  {
    path: '/parts',
    exact: false,
    title: 'Parts',
    icon: 'setting',
    page: Parts,
    auth: [
      RouteGuard.SYSTEM_ADMINISTRATOR,
      RouteGuard.INVENTORY_MANAGER,
      RouteGuard.SALESPERSON
    ]
  },
  {
    path: '/materials',
    exact: false,
    title: 'Materials',
    icon: 'codepen',
    page: Materials,
    auth: [RouteGuard.ANY]
  },
  {
    path: '/customers',
    exact: false,
    title: 'Customers',
    icon: 'team',
    page: Customers,
    auth: [
      RouteGuard.SYSTEM_ADMINISTRATOR,
      RouteGuard.SALESPERSON
    ]
  },
  {
    path: '/finances',
    exact: false,
    title: 'Finances',
    icon: 'dollar',
    page: Finances,
    auth: [
      RouteGuard.ANY
    ]
  },
  {
    path: '/logs',
    exact: false,
    title: 'Logs & Audits',
    icon: 'bars',
    page: Logs,
    auth: [RouteGuard.ANY]
  }
];
