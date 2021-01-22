import * as React from 'react'

import {Dashboard} from "../pages/Dashboard";
import {Users} from "../pages/Users";
import {Products} from '../pages/Products'
import {Parts} from '../pages/Parts'
import {Materials} from '../pages/Materials'
import {Customers} from '../pages/Customers'
import {Finances} from '../pages/Finances'
import {Logs} from '../pages/Logs'

interface Route {
  path: string,
  exact: boolean,
  title: string,
  icon: string,
  page: React.ComponentType<any>
}

export const Routes : Route[] = [
  {
    path: '/dashboard',
    exact: false,
    title: 'Dashboard',
    icon: 'home',
    page: Dashboard
  },
  {
    path: '/users',
    exact: false,
    title: 'Users',
    icon: 'user',
    page: Users
  },
  {
    path: '/products',
    exact: false,
    title: 'Products',
    icon: 'car',
    page: Products
  },
  {
    path: '/parts',
    exact: false,
    title: 'Parts',
    icon: 'setting',
    page: Parts
  },
  {
    path: '/materials',
    exact: false,
    title: 'Materials',
    icon: 'codepen',
    page: Materials
  },
  {
    path: '/customers',
    exact: false,
    title: 'Customers',
    icon: 'team',
    page: Customers
  },
  {
    path: '/finances',
    exact: false,
    title: 'Finances',
    icon: 'dollar',
    page: Finances
  },
  {
    path: '/logs',
    exact: false,
    title: 'Logs & Audits',
    icon: 'bars',
    page: Logs
  }
];
