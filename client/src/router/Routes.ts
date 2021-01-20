import * as React from 'react'

import {Dashboard} from "../pages/Dashboard";
import {Users} from "../pages/Users";

interface Route {
  path: string,
  exact: boolean,
  title: string,
  icon: any,
  page: React.ComponentType<any>
}

export const Routes : Route[] = [
  {
    path: '/dashboard',
    exact: true,
    title: 'Dashboard',
    icon: 'FundOutlined',
    page: Dashboard
  },
  {
    path: '/users',
    exact: true,
    title: 'Users',
    icon: 'UserOutlined',
    page: Users
  }
];
