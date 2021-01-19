import {UserOutlined} from '@ant-design/icons';

import {Dashboard} from "../pages/Dashboard";
import {Users} from "../pages/Users";

export const Routes = [
  {
    path: '/',
    exact: true,
    icon: {UserOutlined},
    title: 'Dashboard',
    page: Dashboard
  },
  {
    path: '/users',
    exact: true,
    icon: {UserOutlined},
    title: 'Users',
    page: Users
  }
];
