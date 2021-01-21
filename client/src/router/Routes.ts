import * as React from 'react'

import {Dashboard} from "../pages/Dashboard";
import {Users} from "../pages/Users";

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
    exact: true,
    title: 'Dashboard',
    icon: 'home',
    page: Dashboard
  },
  {
    path: '/users',
    exact: true,
    title: 'Users',
    icon: 'user',
    page: Users
  }
];
